import { useState } from 'react';

interface BreedImageProps {
  slug: string;
  emoji: string;
  size?: number;
  circular?: boolean;
  /** Stretch to fill the parent container (width/height: 100%) instead of a
   * fixed pixel size — for large showcase placements (e.g. the reveal's
   * top-match portrait) where the parent controls the box via aspect-ratio. */
  fill?: boolean;
}

export default function BreedImage({ slug, emoji, size = 88, circular = true, fill = false }: BreedImageProps) {
  const [imgError, setImgError] = useState(false);
  const boxStyle = fill ? { width: '100%', height: '100%' } : { width: size, height: size };

  if (!imgError) {
    return (
      <img
        src={`/breeds/${slug}.png`}
        alt={slug}
        {...(fill ? {} : { width: size, height: size })}
        onError={() => setImgError(true)}
        style={{
          ...boxStyle,
          borderRadius: circular ? '50%' : '12px',
          objectFit: 'cover',
          border: circular ? '2.5px solid #e1f5ee' : 'none',
          flexShrink: 0,
          display: 'block',
        }}
      />
    );
  }

  return (
    <div style={{
      ...boxStyle,
      borderRadius: circular ? '50%' : '12px',
      background: '#e1f5ee',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: fill ? '96px' : size * 0.4,
      flexShrink: 0,
    }}>
      {emoji}
    </div>
  );
}
