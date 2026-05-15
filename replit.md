# FurtasticMatch

A dog breed matching quiz and SEO-first media property. Users answer 8 lifestyle questions and get personalized dog breed recommendations from a database of 30+ breeds.

## Run & Operate

- `pnpm --filter @workspace/furtastic-match run dev` — run the frontend (port auto-assigned)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + React Router v6
- Styling: Custom CSS properties (no Tailwind utilities) + Google Fonts (Baloo 2, Nunito)
- Data: Static JSON files (no backend, no database)
- Forms: Formspree (email capture, breeder waitlist, contact)
- Analytics: GA4 via gtag

## Where things live

- `artifacts/furtastic-match/src/pages/` — all 9 page components
- `artifacts/furtastic-match/src/components/` — Nav, Footer, AdZone, EmailCapture, CustomSlider
- `artifacts/furtastic-match/src/data/breeds.json` — breed database (30 breeds)
- `artifacts/furtastic-match/src/lib/matchingEngine.ts` — quiz scoring algorithm
- `artifacts/furtastic-match/src/lib/analytics.ts` — GA4 event helpers
- `artifacts/furtastic-match/src/config/flags.ts` — feature flags
- `artifacts/furtastic-match/src/index.css` — full design system (CSS custom properties)
- `artifacts/furtastic-match/.env` — environment variables (Formspree, GA4)
- `artifacts/furtastic-match/netlify.toml` — Netlify deployment config

## Architecture decisions

- No backend — all breed data lives in a static JSON file; matching engine runs client-side
- React Router v6 with BrowserRouter (SPA with Netlify redirect catch-all for deep links)
- Custom drag slider built from scratch (mouse + touch events) — no native HTML range input
- Results page is noindexed; breed profile and comparison pages are SEO-optimized
- Ad zones are placeholder divs at launch; swap in AdSense units when approved

## Product

- **Home** (`/`) — landing page, trust bar, how-it-works, breed chips grid, bottom CTA
- **Quiz** (`/quiz`) — 8-question flow with custom sliders, slide animations, loading screen
- **Results** (`/results?r=[hash]`) — top 3 matches + wildcard, reveal animation, share buttons, email capture
- **Breed Profile** (`/breeds/:slug`) — individual breed pages with SEO meta, traits grid, affiliate CTAs
- **Comparison** (`/compare/:slug`) — side-by-side breed comparisons (5 pre-built)
- **Breeders** (`/breeders`) — breeder waitlist signup form
- **About** (`/about`) — required for AdSense/Mediavine approval
- **Contact** (`/contact`) — contact form
- **Find a Breeder** (`/find-a-breeder?breed=`) — bridge page to Google search

## User preferences

- Exact design system from spec: CSS custom properties, no Tailwind utilities
- No pit bull or pit bull-type breeds in the database

## Gotchas

- Google Fonts @import must be the FIRST line in index.css
- react-router-dom must be installed separately (not in the default scaffold)
- Results page requires `?r=[base64 hash]` URL param — direct navigation without hash shows empty
- Ad zones are placeholders — insert real AdSense units when account is approved
- SOCIAL_PROOF_ENABLED and SPONSORED_BREEDERS_ENABLED flags are both off at launch
- Custom slider uses document-level mouse/touch events — detach listeners on unmount

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- Matching engine: `src/lib/matchingEngine.ts` — weighted scoring across 7 dimensions
- Feature flags: `src/config/flags.ts` — flip SOCIAL_PROOF_ENABLED when 500+ completions reached
