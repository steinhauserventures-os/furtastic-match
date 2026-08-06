import { Heart } from './CustomIcons';
import Icon from './Icon';
import { affiliateUrl, AFFILIATE_PROGRAMS } from '../utils/affiliate';
import { trackEvent, capturePostHogEvent } from '../lib/analytics';
import { INSURANCE_CTA } from '../config/insurance';

interface InsuranceCTAProps {
  breedName: string;
}

// Post-match pet-insurance affiliate CTA — the highest-intent monetization
// moment on the page (buyer just committed emotionally to a breed). Kept
// separate from the breeder bridge per decision 2026-06-22 "Post-Match
// Revenue Play". Renders nothing until src/config/insurance.ts carries a
// real affiliate link and enabled=true, so shipping this dark is safe.
export default function InsuranceCTA({ breedName }: InsuranceCTAProps) {
  if (!INSURANCE_CTA.enabled || INSURANCE_CTA.url.startsWith('PASTE_')) return null;

  const href = affiliateUrl(INSURANCE_CTA.url, INSURANCE_CTA.program);
  const programName = AFFILIATE_PROGRAMS[INSURANCE_CTA.program];

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '18px', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
        <div className="affiliate-row-icon">
          <Icon icon={Heart} size={20} color="#fff" />
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
          Protect your {breedName} from day one
        </div>
      </div>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 16px', lineHeight: 1.5 }}>
        Vet bills for a new puppy can hit four figures fast. Locking in insurance while your dog is young
        and healthy gets the lowest lifetime rate — a quote takes about 2 minutes.
      </p>
      <a
        href={href}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="btn-primary"
        style={{ display: 'inline-flex', padding: '12px 24px', textDecoration: 'none' }}
        onClick={() => {
          trackEvent('affiliate_click', { breed: breedName, cta: 'pet_insurance' });
          capturePostHogEvent('affiliate_click', {
            program: programName,
            destination: href,
            page: typeof window !== 'undefined' ? window.location.pathname : '',
            breed: breedName,
          });
        }}
      >
        Get a free quote →
      </a>
      <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '12px 0 0' }}>
        Affiliate link — we may earn a commission at no cost to you.
      </p>
    </div>
  );
}
