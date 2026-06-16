import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import Icon from './Icon';
import { capturePostHogEvent } from '../lib/analytics';

interface SponsorData {
  id: string;
  name: string;
  breedSlug: string;
  breedName: string;
  location: string;
  tagline: string;
  credentials: string[];
  ctaText: string;
  ctaUrl: string;
  active: boolean;
}

interface SponsorCardProps {
  topBreedSlug: string;
}

export default function SponsorCard({ topBreedSlug }: SponsorCardProps) {
  const [sponsor, setSponsor] = useState<SponsorData | null>(null);

  useEffect(() => {
    fetch('/breeder-sponsors.json')
      .then(r => r.json())
      .then((data: SponsorData[]) => {
        const match = data.find(s => s.active && s.breedSlug === topBreedSlug)
          ?? data.find(s => s.active)
          ?? null;
        setSponsor(match);
      })
      .catch(() => setSponsor(null));
  }, [topBreedSlug]);

  if (!sponsor) return null;

  const handleClick = () => {
    capturePostHogEvent('sponsor_click', {
      sponsor_id: sponsor.id,
      breed: sponsor.breedName,
      destination: sponsor.ctaUrl,
      page: typeof window !== 'undefined' ? window.location.pathname : '',
    });
  };

  return (
    <div className="sponsor-card" style={{ marginBottom: '8px' }}>
      <div className="sponsor-chip">
        <Icon icon={Star} size={10} />
        Featured breeder
      </div>

      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '14px' }}>
        <img
          src={`/breeds/${sponsor.breedSlug}.png`}
          alt={sponsor.breedName}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          style={{ width: 72, height: 72, borderRadius: 10, objectFit: 'cover', border: '1.5px solid var(--sponsor-border)', flexShrink: 0 }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#451a03', marginBottom: 2 }}>
            {sponsor.name}
          </div>
          <div style={{ fontSize: '12px', color: '#92400E', marginBottom: 10 }}>
            {sponsor.location} · {sponsor.tagline}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {sponsor.credentials.map(c => (
              <span key={c} style={{ background: '#FEF3C7', color: '#92400E', border: '1px solid var(--sponsor-border)', fontSize: '10px', fontWeight: 500, padding: '2px 8px', borderRadius: 20 }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      <a
        href={sponsor.ctaUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="btn-sponsor"
        onClick={handleClick}
      >
        {sponsor.ctaText}
        <span>→</span>
      </a>

      <p style={{ fontSize: '10px', color: '#B45309', marginTop: 8 }}>
        Sponsored · FurtasticMatch verified breeder
      </p>
    </div>
  );
}
