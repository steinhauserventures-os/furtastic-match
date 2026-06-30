import { ShoppingBag, Palette } from 'lucide-react';
import Icon from './Icon';
import { affiliateUrl } from '../utils/affiliate';
import { trackEvent, capturePostHogEvent } from '../lib/analytics';

interface GearResourcesProps {
  breedName: string;
}

// Nexbie (Awin) custom pet portrait affiliate. rel="nofollow sponsored" per FTC/SEO.
const NEXBIE_BASE_URL =
  'https://www.awin1.com/cread.php?awinmid=125856&awinaffid=2897167&ued=https%3A%2F%2Fnexbie.com%2Fproducts%2Fcustom-pet-painting';
const NEXBIE_AFFILIATE_URL = affiliateUrl(NEXBIE_BASE_URL, 'nexbie');
const AMAZON_TAG = 'furtasticmatc-20';
const AMAZON_AFFILIATE_URL = `https://www.amazon.com/s?k=new+puppy+essentials&tag=${AMAZON_TAG}`;

// "Gear & Resources" — optional affiliate extras, deliberately placed at the very
// bottom of the results page (below breed matches, email capture, and the breeder
// connection) so monetization never leads. DES-06 trust-first results, 2026-06-22.
// Consolidates the Embark DNA + portrait affiliates that previously rendered inline
// on every MatchCard (same destination repeated) into one neutral, labeled block.
export default function GearResources({ breedName }: GearResourcesProps) {
  const pagePath = () => (typeof window !== 'undefined' ? window.location.pathname : '');
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '18px', padding: '24px' }}>
      <div style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '4px' }}>
        Gear &amp; Resources for {breedName} owners
      </div>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 16px' }}>
        Optional extras for when your new dog comes home. These are affiliate links — we may earn a small commission at no cost to you.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Amazon Associates — new puppy essentials */}
        <a
          href={AMAZON_AFFILIATE_URL}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="affiliate-row"
          style={{ textDecoration: 'none' }}
          onClick={() => {
            trackEvent('affiliate_click', { breed: breedName, cta: 'amazon_essentials' });
            capturePostHogEvent('affiliate_click', { program: 'amazon_associates', destination: AMAZON_AFFILIATE_URL, page: pagePath(), breed: breedName });
          }}
        >
          <div className="affiliate-row-icon">
            <Icon icon={ShoppingBag} size={16} color="#fff" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '12px', fontWeight: 500, color: '#0a3d38', lineHeight: 1.3 }}>
              New puppy essentials
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: 1 }}>
              Top-rated gear for your first dog · ships fast
            </div>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--cta-text)', fontWeight: 500, flexShrink: 0 }}>Shop Amazon →</span>
        </a>

        {/* Nexbie custom pet portrait */}
        <a
          href={NEXBIE_AFFILIATE_URL}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="affiliate-row"
          style={{ textDecoration: 'none' }}
          onClick={() => capturePostHogEvent('affiliate_click', { program: 'nexbie_awin', destination: NEXBIE_AFFILIATE_URL, page: pagePath(), variant: 'results' })}
        >
          <div className="affiliate-row-icon">
            <Icon icon={Palette} size={16} color="#fff" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '12px', fontWeight: 500, color: '#0a3d38', lineHeight: 1.3 }}>
              Custom pet portraits
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: 1 }}>
              Turn your future pup's first photo into gallery-worthy art
            </div>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--cta-text)', fontWeight: 500, flexShrink: 0 }}>See portrait examples →</span>
        </a>
      </div>
    </div>
  );
}
