import { useState } from 'react';
import { Dog } from 'lucide-react';
import Icon, { BRAND_PURPLE } from './Icon';

interface BreedImageProps {
  slug: string;
  emoji: string;
  emojiFontSize?: string;
  style?: React.CSSProperties;
  alt?: string;
}

export default function BreedImage({ slug, emojiFontSize = '32px', style, alt }: BreedImageProps) {
  const [failed, setFailed] = useState(false);

  // Generate alt text from slug if not provided
  const altText = alt || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // Fallback when the breed photo is missing: a neutral brand dog mark.
  if (failed) {
    return <Icon icon={Dog} size={parseInt(emojiFontSize, 10) || 32} color={BRAND_PURPLE} aria-hidden={false} aria-label={altText} />;
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
