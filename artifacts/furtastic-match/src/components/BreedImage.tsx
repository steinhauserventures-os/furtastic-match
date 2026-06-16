import { useState } from 'react';

interface BreedImageProps {
  slug: string;
  emoji: string;
  size?: number;
  circular?: boolean;
}

export default function BreedImage({ slug, emoji, size = 88, circular = true }: BreedImageProps) {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <img
        src={`/breeds/${slug}.png`}
        alt={slug}
        width={size}
        height={size}
        onError={() => setImgError(true)}
        style={{
          width: size,
          height: size,
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
      width: size,
      height: size,
      borderRadius: circular ? '50%' : '12px',
      background: '#e1f5ee',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.4,
      flexShrink: 0,
    }}>
      {emoji}
    </div>
  );
}
