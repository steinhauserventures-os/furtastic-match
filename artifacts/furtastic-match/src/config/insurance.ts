import type { AffiliateProgram } from '../utils/affiliate';

// Post-match pet-insurance affiliate CTA (decision 2026-06-22 "Post-Match
// Revenue Play"). The component stays dark until BOTH conditions hold:
//   1. `enabled` is true
//   2. `url` is a real affiliate link (not the PASTE_ placeholder)
//
// ── CHUCK: once your pet-insurance affiliate account is approved ──
// 1. Replace PASTE_AFFILIATE_LINK_HERE below with the tracking link the
//    program gives you (Lemonade / The Swiftest / Fetch via Partnerize).
// 2. Set `program` to the matching key: 'lemonade' or 'trupanion' (add a new
//    key in src/utils/affiliate.ts AFFILIATE_PROGRAMS if it's another brand).
// 3. Flip `enabled` to true.
// That's the whole go-live. No other file needs touching.
export const INSURANCE_CTA: {
  enabled: boolean;
  program: AffiliateProgram;
  url: string;
} = {
  enabled: false,
  program: 'lemonade',
  url: 'PASTE_AFFILIATE_LINK_HERE',
};
