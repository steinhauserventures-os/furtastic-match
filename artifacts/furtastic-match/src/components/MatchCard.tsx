import { Link } from 'react-router-dom';
import { Medal, Zap, Dna, Award, ShoppingCart, Sparkles, Dices, PawPrint } from 'lucide-react';
import Icon from './Icon';
import BreedImage from './BreedImage';
import BreederIntentCTA from './BreederIntentCTA';
import { trackEvent, capturePostHogEvent } from '../lib/analytics';
import { affiliateUrl } from '../utils/affiliate';
import { Breed, QuizAnswers, explainMatch } from '../lib/matchingEngine';

interface MatchCardProps {
  breed: Breed;
  fitPercent: number;
  revealed: boolean;
  animationDelayMs: number;
  // Wildcard cards get the accent border/badge and the btn-accent DNA CTA.
  isWildcard?: boolean;
  // 0-based rank for the "Match #N" label and medal color (regular matches only).
  rank?: number;
  // Quiz answers power the "why this matched you" block. Null on shared links → falls back.
  answers?: QuizAnswers | null;
}

const MEDAL_COLORS = ['#E0A800', '#9B8FB5', '#B07800'];

export default function MatchCard({
  breed,
  fitPercent,
  revealed,
  animationDelayMs,
  isWildcard = false,
  rank = 0,
  answers = null,
}: MatchCardProps) {
  const animation = revealed ? `fadeInUp 0.5s ease both ${animationDelayMs}ms` : 'none';
  // When we have the user's answers, personalize; otherwise fall back to the family blurb.
  const explanation = answers ? explainMatch(breed, answers) : null;
  const blurb = explanation?.blurb ?? breed.why_it_fits.family;
  const reasons = explanation?.reasons ?? [];

  return (
    <div
      className="card"
      style={{
        padding: '24px',
        animation,
        maxWidth: '100%',
        overflow: 'hidden',
        ...(isWildcard
          ? { borderColor: 'var(--accent)', boxShadow: '4px 4px 0 #FFE070' }
          : {}),
      }}
    >
      {isWildcard && (
        <div style={{ color: '#B07800', fontWeight: 800, fontSize: '14px', marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Icon icon={Dices} size={16} /> Wildcard Pick
        </div>
      )}

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ width: '76px', height: '76px', borderRadius: '12px', background: `linear-gradient(135deg, ${breed.illustration_bg[0]}, ${breed.illustration_bg[1]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0, overflow: 'hidden' }}>
          <BreedImage slug={breed.slug} emoji={breed.emoji} />
        </div>
        <div>
          {isWildcard ? (
            <span style={{ background: '#FFF8E0', color: '#B07800', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 700, marginBottom: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Icon icon={Sparkles} size={11} /> Unexpected match
            </span>
          ) : (
            <div style={{ fontSize: '14px', marginBottom: '4px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Icon icon={Medal} size={16} color={MEDAL_COLORS[rank] ?? MEDAL_COLORS[2]} /> Match #{rank + 1}
            </div>
          )}
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', lineHeight: 1.1, marginBottom: '8px' }}>{breed.name}</h2>
          <span
            style={{
              background: isWildcard ? 'var(--accent)' : 'var(--cta)',
              color: isWildcard ? 'var(--text-primary)' : 'white',
              borderRadius: '20px',
              padding: '4px 12px',
              fontSize: '12px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Icon icon={Zap} size={12} /> {fitPercent}% fit
          </span>
        </div>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: reasons.length ? '16px' : '24px' }}>
        {blurb}
      </p>

      {reasons.length > 0 && (
        <div style={{ background: '#F5F0FF', borderRadius: '12px', padding: '14px 16px', marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--cta)', marginBottom: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Icon icon={Sparkles} size={13} /> {isWildcard ? 'Why we threw this one in' : 'Why this matched you'}
          </div>
          <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {reasons.map((reason, idx) => (
              <li key={idx} style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{reason}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <a
            href={affiliateUrl(`https://marketplace.akc.org/puppies/${breed.slug}`, 'akc')}
            target="_blank" rel="noopener noreferrer"
            onClick={() => capturePostHogEvent('affiliate_click', { program: 'akc_marketplace', destination: `https://marketplace.akc.org/puppies/${breed.slug}`, page: typeof window !== 'undefined' ? window.location.pathname : '', breed: breed.name })}
            className="btn-outline"
            style={{ padding: '10px 8px', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
          >
            <Icon icon={Award} size={16} /> Find AKC Breeders
          </a>
          <a
            href={affiliateUrl(`https://www.gooddog.com/breeds/${breed.slug}`, 'gooddog')}
            target="_blank" rel="noopener noreferrer"
            onClick={() => capturePostHogEvent('affiliate_click', { program: 'gooddog', destination: `https://www.gooddog.com/breeds/${breed.slug}`, page: typeof window !== 'undefined' ? window.location.pathname : '', breed: breed.name })}

            className="btn-outline"
            style={{ padding: '10px 8px', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
          >
            <Icon icon={PawPrint} size={16} /> Browse on GoodDog
          </a>
          <a
            href={affiliateUrl(`https://www.chewy.com/s?query=${encodeURIComponent(breed.name)}`, 'chewy')}
            target="_blank" rel="noopener noreferrer"
            onClick={() => capturePostHogEvent('affiliate_click', { program: 'chewy', destination: `https://www.chewy.com/s?query=${encodeURIComponent(breed.name)}`, page: typeof window !== 'undefined' ? window.location.pathname : '', breed: breed.name })}
            className="btn-outline"
            style={{ padding: '10px 8px', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gridColumn: '1 / -1' }}
          >
            <Icon icon={ShoppingCart} size={16} /> Shop {breed.name} Essentials
          </a>
        </div>
        <a
          href={affiliateUrl('https://embarkvet.com', 'embark')}
          target="_blank" rel="noopener noreferrer"
          onClick={() => { trackEvent('breeder_click', { breed: breed.name, cta: 'dna_test' }); capturePostHogEvent('affiliate_click', { program: 'embark_dna', destination: 'https://embarkvet.com', page: typeof window !== 'undefined' ? window.location.pathname : '', breed: breed.name }); }}
          className={isWildcard ? 'btn-accent' : 'btn-primary'}
          style={{ display: 'flex', justifyContent: 'center', padding: '12px 16px', textDecoration: 'none' }}
        >
          <Icon icon={Dna} size={18} /> Test Your Future Pup's DNA
        </a>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', fontStyle: 'italic', margin: 0 }}>
          Affiliate link — we may earn a small commission at no cost to you.
        </p>
        <BreederIntentCTA breedName={breed.name} />
        <Link
          to={`/breeds/${breed.slug}`}
          className="btn-outline"
          style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '13px' }}
        >
          Learn More About {breed.name}
        </Link>
      </div>
    </div>
  );
}
