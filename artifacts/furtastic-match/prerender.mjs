// Build-time prerenderer for the FurtasticMatch SPA.
//
// Why: every route currently serves the same empty index.html shell, so
// Googlebot sees no content. This script boots `vite preview` against the
// freshly built `dist/public`, drives a headless Chromium with puppeteer-core
// to render each route, and writes the resulting HTML back to
// `dist/public/<route>/index.html`. nginx (`try_files $uri $uri/ /index.html`)
// then serves those static snapshots, and the client hydrates them in place
// (see src/main.tsx).
//
// react-snap was the original plan but is unusable here: it is unmaintained,
// assumes React 18, and pulls an ancient Puppeteer whose Chromium download is
// blocked by this pnpm workspace's build-script allowlist. This custom script
// uses the system Chromium + puppeteer-core instead.
//
// Usage (from artifacts/furtastic-match):
//   node_modules/.bin/vite build && node prerender.mjs
//   (or: pnpm run prerender)

import { spawn } from "node:child_process";
import { mkdir, writeFile, access, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import http from "node:http";
import puppeteer from "puppeteer-core";

const ROOT = import.meta.dirname;
const DIST = path.join(ROOT, "dist", "public");
const PORT = Number(process.env.PRERENDER_PORT || 4178);
const ORIGIN = `http://127.0.0.1:${PORT}`;

// Routes to snapshot. Keep in sync with the brief; these are the SEO-priority
// pages (home, learn index, the six learn articles) plus the two app pages.
// Note: "/results" is intentionally excluded — it renders nothing on a cold
// load (it depends on quiz answers held in client state), so a snapshot would
// be an empty shell with no SEO value.
const ROUTES = [
  "/",
  "/quiz",
  "/learn",
  "/learn/best-dog-breeds-for-families",
  "/learn/dog-breed-quiz",
  "/learn/golden-retriever-vs-labrador",
  "/learn/goldendoodle-vs-labradoodle",
  "/learn/hypoallergenic-dog-breeds",
  "/learn/low-shedding-dog-breeds",
];

// Resolve a Chromium/Chrome executable. Prefer an explicit override, then the
// common system locations on this VPS.
function resolveChrome() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  for (const p of ["/snap/bin/chromium", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/google-chrome"]) {
    if (existsSync(p)) return p;
  }
  throw new Error("no Chromium/Chrome binary found — set PUPPETEER_EXECUTABLE_PATH");
}

function waitForServer(url, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(url, (res) => {
        res.resume();
        resolve();
      });
      req.on("error", () => {
        if (Date.now() > deadline) reject(new Error(`preview server did not start at ${url}`));
        else setTimeout(tick, 300);
      });
    };
    tick();
  });
}

async function main() {
  // Sanity: build output must exist.
  try {
    await access(path.join(DIST, "index.html"));
  } catch {
    throw new Error(`${DIST}/index.html not found — run \`vite build\` first.`);
  }

  // 1. Boot vite preview against the build output.
  const vite = spawn(
    path.join(ROOT, "node_modules", ".bin", "vite"),
    ["preview", "--config", "vite.config.ts", "--port", String(PORT), "--strictPort", "--host", "127.0.0.1"],
    { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"], env: { ...process.env } },
  );
  vite.stdout.on("data", (d) => process.stdout.write(`[preview] ${d}`));
  vite.stderr.on("data", (d) => process.stderr.write(`[preview] ${d}`));

  let browser;
  const snapshots = [];
  try {
    await waitForServer(`${ORIGIN}/`);
    console.log(`preview server up on ${ORIGIN}`);

    // 2. Launch headless Chromium.
    browser = await puppeteer.launch({
      executablePath: resolveChrome(),
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
    });

    // 3. Render each route and capture the live DOM. Buffer all captures before
    //    writing so we never serve a half-written snapshot during the run.
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 900 });
      try {
        await page.goto(`${ORIGIN}${route}`, { waitUntil: "domcontentloaded", timeout: 30000 });
        // Wait for React to mount real content into #root. Content pages render
        // synchronously (bundled markdown / static data), so non-empty #root
        // with a meaningful amount of text is the reliable signal. Don't wait on
        // networkidle — gtag/adsense/impact never settle.
        await page.waitForFunction(
          () => {
            const r = document.getElementById("root");
            return !!r && r.childElementCount > 0 && (r.innerText || "").replace(/\s+/g, " ").trim().length > 100;
          },
          { timeout: 15000 },
        );
        // Brief settle so per-route document.title / meta useEffects apply.
        await new Promise((r) => setTimeout(r, 250));
        const html = await page.evaluate(() => "<!DOCTYPE html>\n" + document.documentElement.outerHTML);
        const title = await page.title();
        snapshots.push({ route, html });
        console.log(`  rendered ${route}  (${html.length} bytes)  title="${title}"`);
      } catch (err) {
        // Non-fatal: skip this route (no snapshot written) but keep going so one
        // stubborn page can't abort the whole prerender. Surfaced in the summary.
        console.error(`  SKIPPED ${route}: ${err.message.split("\n")[0]}`);
      } finally {
        await page.close();
      }
    }
  } finally {
    if (browser) await browser.close();
    vite.kill("SIGTERM");
  }

  // 4a. Preserve the pristine empty-#root shell as the SPA fallback (200.html)
  //     BEFORE we overwrite index.html with the home snapshot. nginx falls back
  //     to /200.html for non-prerendered routes, so they hydrate cleanly via
  //     createRoot instead of flashing the home page + throwing a hydration
  //     mismatch. (At this point index.html is still the untouched build shell.)
  await copyFile(path.join(DIST, "index.html"), path.join(DIST, "200.html"));
  console.log("  wrote dist/public/200.html (SPA fallback shell)");

  // 4b. Write snapshots. "/" overwrites the shell index.html (home gets
  //     prerendered too); every other route gets <route>/index.html.
  for (const { route, html } of snapshots) {
    const outDir = route === "/" ? DIST : path.join(DIST, route);
    await mkdir(outDir, { recursive: true });
    const outFile = path.join(outDir, "index.html");
    await writeFile(outFile, html, "utf8");
    console.log(`  wrote ${path.relative(ROOT, outFile)}`);
  }

  console.log(`\nprerendered ${snapshots.length}/${ROUTES.length} routes.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
