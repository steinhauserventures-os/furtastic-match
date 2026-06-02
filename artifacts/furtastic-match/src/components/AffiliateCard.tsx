import { ArrowRight } from 'lucide-react';
import Icon from './Icon';

interface AffiliateCardProps {
  breedName: string;
}

// Nexbie (Awin) custom pet portrait affiliate — placed in the reserved breed-profile
// ad slot while AdSense is on hold. rel="nofollow sponsored" per FTC/SEO requirements.
const NEXBIE_AFFILIATE_URL =
  'https://www.awin1.com/cread.php?awinmid=125856&awinaffid=2897167&ued=https%3A%2F%2Fnexbie.com%2Fproducts%2Fcustom-pet-painting';

export default function AffiliateCard({ breedName }: AffiliateCardProps) {
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
        Celebrate Your New {breedName}
      </h3>
      <p
        style={{
          fontSize: '14px',
          lineHeight: 1.5,
          color: 'var(--text-secondary)',
          margin: 0,
        }}
      >
        Turn their photo into a gallery-worthy custom pet portrait
      </p>
      <a
        href={NEXBIE_AFFILIATE_URL}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
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
        Shop Custom Portraits <Icon icon={ArrowRight} size={18} />
      </a>
    </div>
  );
}
