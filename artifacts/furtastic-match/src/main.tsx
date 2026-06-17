import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initPostHog } from "./lib/analytics";

// Initialise PostHog before React renders so the first pageview is captured.
// No-ops if VITE_POSTHOG_KEY is not set in the environment.
initPostHog();

const rootElement = document.getElementById("root")!;

if (rootElement.hasChildNodes()) {
  // Build-time prerendered HTML is present (see prerender.mjs) — hydrate it in
  // place so Googlebot's initial HTML has real content and the client takes over.
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}
