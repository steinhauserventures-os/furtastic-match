import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Megaphone, CheckCircle2 } from 'lucide-react';
import Icon from './Icon';
import { trackEvent } from '../lib/analytics';

interface BreederIntentCTAProps {
  breedName: string;
}

// Per-card breeder recruitment CTA. Dual-purpose (brief §6): recruits breeders who
// take the quiz AND signals to buyers that real breeders are coming. v0 intent
// capture — collects email + metro inline and posts to the same Formspree endpoint
// the full /breeders waitlist uses (source:'breeder'), tagged origin so the
// results-page leads are distinguishable downstream (Brevo list 7).
export default function BreederIntentCTA({ breedName }: BreederIntentCTAProps) {
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [metro, setMetro] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !metro) return;

    try {
      await fetch('https://formspree.io/f/mlgzaedb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          email,
          metro,
          breeds: breedName,
          source: 'breeder',
          origin: 'results-page-intent',
        }),
      });
      setSubmitted(true);
      trackEvent('breeder_lead', { breed: breedName, origin: 'results-page-intent' });
    } catch (error) {
      console.error('Breeder intent capture error:', error);
    }
  };

  if (submitted) {
    return (
      <div style={{ border: '2px solid var(--teal)', borderRadius: '12px', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--teal)', fontWeight: 700, fontSize: '14px', textAlign: 'center' }}>
        <Icon icon={CheckCircle2} size={18} /> You're on the list — we'll reach out about featuring your {breedName} litters.
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: '12px', padding: '14px 16px', background: 'var(--bg-muted)' }}>
      {!expanded ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Icon icon={Megaphone} size={16} color="var(--cta)" /> Are you a {breedName} breeder?
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
            Get featured in these results when families match with your breed.
          </p>
          <button
            type="button"
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            onClick={() => {
              setExpanded(true);
              trackEvent('breeder_intent_open', { breed: breedName });
            }}
          >
            Get featured here <Icon icon={ArrowRight} size={14} />
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)', textAlign: 'center', marginBottom: '2px' }}>
            Feature your {breedName} litters
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '2px solid var(--border)', fontFamily: 'var(--font-body)', fontSize: '14px', boxSizing: 'border-box' }}
          />
          <input
            type="text"
            value={metro}
            onChange={(e) => setMetro(e.target.value)}
            placeholder="Your metro area (e.g. Austin, TX)"
            required
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '2px solid var(--border)', fontFamily: 'var(--font-body)', fontSize: '14px', boxSizing: 'border-box' }}
          />
          <button type="submit" className="btn-primary" style={{ padding: '10px', fontSize: '14px', justifyContent: 'center' }}>
            Request a featured spot
          </button>
          <Link to="/breeders" style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', textDecoration: 'underline' }}>
            Prefer the full form? Visit our breeder page
          </Link>
        </form>
      )}
    </div>
  );
}
