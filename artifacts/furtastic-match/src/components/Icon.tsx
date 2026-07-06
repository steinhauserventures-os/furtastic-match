import type { LucideIcon, LucideProps } from 'lucide-react';

/**
 * Brand teal used for standalone decorative icons / brand marks on light
 * surfaces. Mirrors the site's single accent color (CSS var --cta) — the
 * brand system has exactly one accent, so this is not a separate color.
 */
export const BRAND_ACCENT = '#0D9488';

interface IconProps extends Omit<LucideProps, 'ref'> {
  icon: LucideIcon;
}

/**
 * Shared wrapper around Lucide icons so sizing, stroke weight, and
 * decorative a11y handling stay consistent across the site.
 *
 * Defaults to `currentColor` so icons inherit the surrounding text color
 * inside buttons and links. Pass an explicit `color` (e.g. BRAND_ACCENT)
 * for standalone decorative marks. Icons are aria-hidden by default since
 * they sit alongside text labels; pass `aria-hidden={false}` + an
 * `aria-label` for the rare icon-only case.
 */
export default function Icon({ icon: LucideCmp, size = 20, strokeWidth = 2, ...rest }: IconProps) {
  return <LucideCmp size={size} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />;
}
