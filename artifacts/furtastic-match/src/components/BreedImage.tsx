import { useState } from 'react';

interface BreedImageProps {
  slug: string;
  emoji: string;
  emojiFontSize?: string;
  style?: React.CSSProperties;
  alt?: string;
}

export default function BreedImage({ slug, emoji, emojiFontSize = '32px', style, alt }: BreedImageProps) {
  const [failed, setFailed] = useState(false);

  // Generate alt text from slug if not provided
  const altText = alt || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  if (failed) {
    return <span style={{ fontSize: emojiFontSize, lineHeight: 1 }}>{emoji}</span>;
  }

  return (
    <img
      src={`${import.meta.env.BASE_URL}breeds/${slug}.png`}
      alt={altText}
      onError={() => setFailed(true)}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
    />
  );
}
