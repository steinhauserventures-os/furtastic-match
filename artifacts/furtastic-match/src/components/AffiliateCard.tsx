import { ArrowRight } from 'lucide-react';
import Icon from './Icon';
import { affiliateUrl } from '../utils/affiliate';
import { capturePostHogEvent } from '../lib/analytics';

interface AffiliateCardProps {
  breedName: string;
  // 'profile' = breed-profile page (owner already has the dog).
  // 'results' = quiz results page (prospective owner, still choosing a breed).
  variant?: 'profile' | 'results';
}

// Nexbie (Awin) custom pet portrait affiliate — placed in the reserved breed-profile
// ad slot while AdSense is on hold. rel="nofollow sponsored" per FTC/SEO requirements.
const NEXBIE_BASE_URL =
  'https://www.awin1.com/cread.php?awinmid=125856&awinaffid=2897167&ued=https%3A%2F%2Fnexbie.com%2Fproducts%2Fcustom-pet-painting';
const NEXBIE_AFFILIATE_URL = affiliateUrl(NEXBIE_BASE_URL, 'nexbie');

// Copy is context-dependent: a breed-profile visitor likely owns the dog, while a
// results visitor is still choosing one and has no pet/photo yet — so the results
// pitch is forward-looking rather than "turn their photo into a portrait."
const COPY = {
  profile: {
    heading: (breedName: string) => `Celebrate Your New ${breedName}`,
    sub: 'Turn their photo into a gallery-worthy custom pet portrait',
    cta: 'Shop Custom Portraits',
  },
  results: {
    heading: (breedName: string) => `Picture Your Future ${breedName}`,
    sub: 'When your new best friend comes home, turn their first photo into a gallery-worthy custom portrait',
    cta: 'Browse Pet Portraits',
  },
} as const;

export default function AffiliateCard({ breedName, variant = 'profile' }: AffiliateCardProps) {
  const copy = COPY[variant];
  const handleClick = () => {
    capturePostHogEvent('affiliate_click', {
      program: 'nexbie_awin',
      destination: NEXBIE_AFFILIATE_URL,
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      variant,
    });
  };
  return (
    <div
      className="card"
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontWeight: 700,
          color: 'var(--text-muted)',
        }}
      >
        Sponsored
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '20px',
          lineHeight: 1.2,
          color: 'var(--text-secondary)',
          margin: 0,
        }}
      >
        {copy.heading(breedName)}
      </h3>
      <p
        style={{
          fontSize: '14px',
          lineHeight: 1.5,
          color: 'var(--text-secondary)',
          margin: 0,
        }}
      >
        {copy.sub}
      </p>
      <a
        href={NEXBIE_AFFILIATE_URL}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        onClick={handleClick}
        className="btn-primary"
        style={{
          padding: '14px 24px',
          fontSize: '15px',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        {copy.cta} <Icon icon={ArrowRight} size={18} />
      </a>
    </div>
  );
}
