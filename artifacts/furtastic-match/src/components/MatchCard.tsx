import { Link } from 'react-router-dom';
import { Medal, Sparkles, Dices } from 'lucide-react';
import Icon from './Icon';
import BreedImage from './BreedImage';
import BreederIntentCTA from './BreederIntentCTA';
import { capturePostHogEvent } from '../lib/analytics';
import { affiliateUrl } from '../utils/affiliate';
import { Breed, QuizAnswers, explainMatch } from '../lib/matchingEngine';

interface MatchCardProps {
  breed: Breed;
  fitPercent: number;
  revealed: boolean;
  animationDelayMs: number;
  isWildcard?: boolean;
  rank?: number;
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
  const explanation = answers ? explainMatch(breed, answers) : null;
  const blurb = explanation?.blurb ?? breed.why_it_fits.family;
  const reasons = explanation?.reasons ?? [];

  const gooddogUrl = affiliateUrl(`https://www.gooddog.com/breeds/${breed.slug}`, 'gooddog');
  const akcUrl = affiliateUrl(`https://www.akc.org/dog-breeds/${breed.slug}/`, 'akc');

  return (
    <div
      className="card"
      style={{
        padding: '20px',
        animation,
        maxWidth: '100%',
        overflow: 'hidden',
        ...(isWildcard ? { borderColor: 'var(--accent)', boxShadow: '4px 4px 0 #FFE070' } : {}),
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
        <BreedImage slug={breed.slug} emoji={breed.emoji} size={88} circular />
        <div style={{ flex: 1 }}>
          {isWildcard ? (
            <span style={{ background: '#FFF8E0', color: '#B07800', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 700, marginBottom: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Icon icon={Sparkles} size={11} /> Unexpected match
            </span>
          ) : (
            <div style={{ fontSize: '13px', marginBottom: '4px', display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)' }}>
              <Icon icon={Medal} size={14} color={MEDAL_COLORS[rank] ?? MEDAL_COLORS[2]} />
              Match #{rank + 1}
            </div>
          )}
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', lineHeight: 1.1, marginBottom: '8px', color: 'var(--text-primary)' }}>
            {breed.name}
          </h2>
          <span style={{ background: isWildcard ? 'var(--accent)' : 'var(--cta)', color: isWildcard ? 'var(--text-primary)' : 'white', borderRadius: '20px', padding: '3px 10px', fontSize: '11px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            {fitPercent}% fit
          </span>
        </div>
      </div>

      {/* Blurb */}
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, marginBottom: reasons.length ? '14px' : '18px' }}>
        {blurb}
      </p>

      {/* Why this matched you */}
      {reasons.length > 0 && (
        <div style={{ background: '#E1F5EE', borderRadius: '10px', padding: '12px 14px', marginBottom: '18px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--cta-text)', marginBottom: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Icon icon={Sparkles} size={12} /> {isWildcard ? 'Why we threw this one in' : 'Why this matched you'}
          </div>
          <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {reasons.map((reason, idx) => (
              <li key={idx} style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{reason}</li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>

        {/* 1. Primary CTA — connect buyers to vetted breeders (FM's core business).
            Trust-first framing per DES-06: no inventory/availability language. */}
        <a
          href={gooddogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ display: 'flex', justifyContent: 'center', padding: '11px 16px', textDecoration: 'none', fontSize: '14px' }}
          onClick={() => capturePostHogEvent('affiliate_click', { program: 'gooddog', destination: gooddogUrl, page: typeof window !== 'undefined' ? window.location.pathname : '', breed: breed.name })}
        >
          Connect with verified {breed.name} breeders →
        </a>

        {/* 2. Research links (Embark DNA + portrait affiliates moved to the
            bottom-of-page "Gear & Resources" section — DES-06 deprioritization). */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <a
            href={akcUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '14px', color: 'var(--cta-text)', fontWeight: 500, textDecoration: 'underline' }}
            onClick={() => capturePostHogEvent('affiliate_click', { program: 'akc_breed_guide', destination: akcUrl, page: typeof window !== 'undefined' ? window.location.pathname : '', breed: breed.name })}
          >
            AKC breed guide
          </a>
          <span style={{ color: 'var(--text-muted)' }}>·</span>
          <Link
            to={`/breeds/${breed.slug}`}
            style={{ fontSize: '14px', color: 'var(--cta-text)', fontWeight: 500, textDecoration: 'underline' }}
          >
            {breed.name} breed guide
          </Link>
        </div>

        {/* 3. Breeder intent CTA — T3: one breed-specific block, on the #1
            match only (not the wildcard, which also defaults to rank 0). */}
        {rank === 0 && !isWildcard && <BreederIntentCTA breedName={breed.name} />}
      </div>

      <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', fontStyle: 'italic', margin: '10px 0 0' }}>
        Affiliate links — we may earn a small commission at no cost to you.
      </p>
    </div>
  );
}
