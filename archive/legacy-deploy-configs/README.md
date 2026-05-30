# Legacy deploy configs (archived)

These files configured deploy targets that FurtasticMatch **no longer uses**. The
Hostinger VPS (served from `/var/www/furtasticmatch.com` via nginx) is the sole
deploy target — see FM-T002.

They were archived (not deleted) on 2026-05-30 so the history/settings remain
recoverable. Nothing in the build path (`vite.config.ts`, `pnpm-workspace.yaml`)
references them.

| File | Was at | Purpose |
|------|--------|---------|
| `.replit` | repo root | Replit run/deploy + port config |
| `.replitignore` | repo root | Replit file-sync ignore list |
| `replit.md` | repo root | Replit project notes |
| `netlify.toml` | `artifacts/furtastic-match/` | Netlify build + SPA redirect config |

**Note:** the `@replit/*` Vite plugins in `package.json` / the pnpm catalog are a
separate concern and were intentionally kept — `vite.config.ts` imports
`@replit/vite-plugin-runtime-error-modal` and conditionally loads the cartographer
and dev-banner plugins (guarded by `REPL_ID`, so they're no-ops off Replit).
