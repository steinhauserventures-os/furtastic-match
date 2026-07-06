interface PawPrintMarkProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Small hand-drawn paw print mark. Hand-authored vector paths (not a
 * lucide/icon-library glyph) — five slightly irregular blobs (one pad,
 * four toes) rather than perfect geometric shapes, for a sketched feel.
 * Used sparingly: the quiz progress dots and one subtle accent near the
 * reveal portrait. Not a general-purpose icon.
 */
export default function PawPrintMark({ size = 16, color = 'currentColor', style, className }: PawPrintMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill={color}
      style={style}
      className={className}
      aria-hidden="true"
    >
      <path d="M29,74 C25,61 34,50 51,50 C68,50 77,61 72,76 C70,87 59,93 49,92 C36,91 31,84 29,74 Z" />
      <path d="M5,50 C3,44 7,38 13,38 C19,38 22,44 20,51 C19,56 11,57 7,54 C5,53 4,52 5,50 Z" />
      <path d="M25,22 C23,14 29,9 36,9 C44,9 49,15 47,23 C46,29 37,31 31,28 C27,26 25,25 25,22 Z" />
      <path d="M55,20 C54,11 61,6 69,7 C77,8 81,15 78,23 C76,29 66,30 60,26 C57,24 55,23 55,20 Z" />
      <path d="M78,46 C77,39 82,34 88,35 C94,36 97,42 95,49 C93,54 84,55 80,51 C78,50 77,48 78,46 Z" />
    </svg>
  );
}
