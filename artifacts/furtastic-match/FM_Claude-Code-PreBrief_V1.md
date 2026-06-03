# FM Results Page — Claude Code Pre-Brief V1
*Read this before touching any code. Everything here is already decided — do not re-derive, do not ask about Netlify.*

---

## 1. Stack & Deploy (non-negotiable)

- **Hosting:** Ubuntu 24.04 VPS at `187.127.251.150`. Nginx. NOT Netlify, Vercel, or any cloud platform.
- **Nginx web root:** `/var/www/furtasticmatch.com`
- **Repo:** `/root/furtastic-match` (full monorepo)
- **App code lives at:** `/root/furtastic-match/artifacts/furtastic-match/`
- **Build command:** `cd /root/furtastic-match/artifacts/furtastic-match && npm run build`
- **Deploy command:** `cp -r dist/public/. /var/www/furtasticmatch.com/`
- **Current production branch:** `signup-source-wiring` — NOT main. This branch has live source-attribution wiring. Do all results page work on a new branch off this one, not off main.
- **Package manager:** pnpm (workspace at repo root)
- **Framework:** Vite + React SPA (React Router v6). No SSR. All breed cards are client-side rendered from the `?r=` URL param.

---

## 2. The File You're Editing

**`artifacts/furtastic-match/src/pages/Results.tsx`**

- Single monolithic file (~500 lines). No separate MatchCard component — card JSX is inlined in `matches.map()` and duplicated in the wildcard block.
- If making significant changes, extract a `MatchCard` component first — it'll save you editing the same block twice.

**Other relevant files:**
- `src/components/AffiliateCard.tsx` — Nexbie/Awin affiliate card. Already built. Currently placed on breed profile pages only. Needs to come to results page.
- `src/components/AdZone.tsx` — renders null. Placeholder for future AdSense. Don't remove it.
- `src/components/BreedImage.tsx` — loads from `public/breeds/{slug}.png`. Falls back to Dog icon.
- `src/pages/Breeders.tsx` — breeder waitlist form. 7 of 10 required fields live.

---

## 3. Affiliate Status — What's Earning vs. What's Not

| Link | Status | Notes |
|---|---|---|
| **Nexible (Awin)** | ✅ **Approved and live** | 15% commission. Custom pet portrait. Already built in `AffiliateCard.tsx`. NOT YET on results page. This is the only active revenue. |
| Embark DNA | ❌ Not approved | On results page with UTM links. Earning $0. Reapply gate: 15 breed pages + 500/mo organic visitors. |
| Chewy | ❌ Not approved | On results page with UTM links. Earning $0. Lowest bar — reapply at 30 days + 10 pages. |
| AKC Marketplace | ❌ Not affiliate | Outbound link only. |
| GoodDog | ❌ Not affiliate | Outbound link only. |
| Amazon Associates | ❌ Not approved | Reapply last — 25+ pages, 90+ days, 1,500+ visitors. |

**Immediate action:** Nexible/Awin needs to be placed on the results page. The `AffiliateCard.tsx` component exists — integrate it at the email capture / "save your results" beat (bottom of page), NOT inside each breed card where it competes with the breeder goal.

**Do NOT remove or demote Embark/Chewy/AKC links** — they drive real user action even without affiliate tracking. Just ensure they're positioned correctly (breeder discovery first, affiliate links secondary).

---

## 4. Breeder Monetization Model (Daryl, 2026-05-21)

This is a **B2B SaaS model, not a media buy.** Breeders pay a monthly subscription for a featured placement.

**Three tiers:**
- **Founding Breeder** — $39/mo or $390/yr (first 25 only, permanent rate, "Founding Breeder" badge)
- **Standard Breeder** — $79/mo or $790/yr (up to 3 active litters, lead delivery via Brevo, featured in quiz results for their breed) — this is the core economic unit
- **Premium Breeder** — $149/mo or $1,490/yr (priority placement, unlimited litters, breed-page sidebar, newsletter slot — available Month 6+)

**The geo-match mechanic (designed, NOT yet built):**
ipapi.co → match user metro to `breeder-sponsors.json` → show sponsored breeder card if match found → fall back to affiliate link if none.
Data schema: `{ breed, kennel, metro, state, url, tier, active }`

**Current state of breeder slot:** Does not exist in code. The results page has only a text CTA: "Are you a [breed] breeder? Get featured here →" linking to `/breeders`. The `/breeders` page is a waitlist form (7 of 10 fields live). No `breeder-sponsors.json`, no geo-matching, no actual breeder cards.

**What to build for the breeder slot (v0, before geo-matching):**
Don't wait for the full geo-match system. Build an intent-capture CTA that collects email + metro from interested breeders. This validates demand before the infrastructure is built.

---

## 5. Results Page — Current State (confirmed from live review, 2026-06-02)

**URL pattern:** `furtasticmatch.com/results?r={base64-encoded-breed-array}`

**What's on the page (top to bottom):**
1. Pre-reveal splash overlay (purple, full-screen) with "REVEAL MY MATCHES" button
2. After reveal: Nav bar
3. "Here are your perfect breeds" H1 + subtext
4. 3 match cards + 1 wildcard card
5. Each card contains (order after 2026-06-03 fix):
   - Breed photo + name + % fit badge
   - One-line description
   - Find AKC Breeders + Browse on GoodDog (2-col grid)
   - Shop [Breed] Essentials (full width)
   - DNA affiliate CTA (Embark, no tracking)
   - Affiliate disclaimer
   - "Are you a [breed] breeder? Get featured here →" (text link)
   - "Learn More About [breed]" button
6. Affiliate disclosure paragraph
7. Email capture ("Save your results" + email field)
8. Share section (Facebook, Reddit, Copy Link)
9. Footer

**Right sidebar (desktop):** Generic "Are you a breeder?" card — remove this, keep per-card version only.

---

## 6. What NOT to Do

- **Do not suggest Netlify, Vercel, or any cloud hosting.** VPS + nginx only.
- **Do not reapply to Chewy, Embark, or Amazon yet.** Thresholds above. Premature reapplication risks permanent rejection.
- **Do not reapply to AdSense yet.** Gate: 10+ content pages (~8 live as of 2026-06-02).
- **Do not build the full geo-match breeder system yet.** Build v0 intent capture first.
- **Do not remove the per-card "Are you a [breed] breeder? Get featured here" CTA.** Keep it, make it more prominent.
- **Do not remove AdZone components.** They render null now but slots are pre-positioned.
- **Do not switch to main branch.** Work from `signup-source-wiring` or a new branch off it.

---

## 7. Build Priority Order

1. **Nexible integration** — drop `AffiliateCard.tsx` onto results page at the email-capture beat. Only active revenue. Already built, just needs placement.
2. **"Why this matched you" block** — 2-3 sentence personalization per card tying back to quiz answers. Closes the quiz loop.
3. **Breeder intent capture v0** — replace/augment "Get featured here" with micro-form (email + metro + breed). Feeds Brevo list 7.
4. **Remove generic sidebar** — keep per-card breeder CTA only.
5. **Branch → build → preview → Chuck approves → deploy.**

---

## 8. Analytics & Tracking

- **PostHog** (project 445154) — only analytics tool. Do not add GA4.
- Key events already firing: `quiz_complete_view`, `breeder_click`, `share_click`

---

## 9. Brevo Email Context

- **List 6:** Quiz signups (W-1 → W-2 → W-3 drip, all live)
- **List 7:** Breeder signups (waitlist)
- W-3 is a daily 7am cron on the VPS — do not interfere with it

---

## 10. Key Accounts

- **Awin account:** Nexible approved, publisher credentials in `/root/.env`
- **PostHog:** Project 445154
- **Brevo:** Lists 6 (users) and 7 (breeders)
- **ClickUp sprint list:** `901416811413`
