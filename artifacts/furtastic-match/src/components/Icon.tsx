import type { LucideIcon, LucideProps } from 'lucide-react';

/**
 * Brand purple used for standalone paw / brand marks on light surfaces.
 * (The site's primary action color lives in CSS var --cta; this is the
 * dedicated brand-mark purple from the FurtasticMatch brand guide.)
 */
export const BRAND_PURPLE = '#7C3AED';

interface IconProps extends Omit<LucideProps, 'ref'> {
  icon: LucideIcon;
}

/**
 * Shared wrapper around Lucide icons so sizing, stroke weight, and
 * decorative a11y handling stay consistent across the site.
 *
 * Defaults to `currentColor` so icons inherit the surrounding text color
 * inside buttons and links. Pass an explicit `color` (e.g. BRAND_PURPLE)
 * for standalone decorative marks. Icons are aria-hidden by default since
 * they sit alongside text labels; pass `aria-hidden={false}` + an
 * `aria-label` for the rare icon-only case.
 */
export default function Icon({ icon: LucideCmp, size = 20, strokeWidth = 2, ...rest }: IconProps) {
  return <LucideCmp size={size} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />;
}
