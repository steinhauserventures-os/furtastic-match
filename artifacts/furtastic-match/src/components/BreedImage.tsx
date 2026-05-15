import { useState } from 'react';

interface BreedImageProps {
  slug: string;
  emoji: string;
  emojiFontSize?: string;
  style?: React.CSSProperties;
}

export default function BreedImage({ slug, emoji, emojiFontSize = '32px', style }: BreedImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span style={{ fontSize: emojiFontSize, lineHeight: 1 }}>{emoji}</span>;
  }

  return (
    <img
      src={`${import.meta.env.BASE_URL}breeds/${slug}.png`}
      alt=""
      onError={() => setFailed(true)}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
    />
  );
}
