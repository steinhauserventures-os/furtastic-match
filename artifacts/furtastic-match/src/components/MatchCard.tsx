import { Link } from 'react-router-dom';
import { Medal, Sparkles, Dices } from 'lucide-react';
import Icon from './Icon';
import BreedImage from './BreedImage';
import BreederIntentCTA from './BreederIntentCTA';
import PawPrintMark from './PawPrintMark';
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

const MEDAL_COLORS = ['#E0A800', '#94A3B8', '#B07800'];

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
  const isTopMatch = rank === 0 && !isWildcard;

  const gooddogUrl = affiliateUrl(`https://www.gooddog.com/breeds/${breed.slug}`, 'gooddog');
  const akcUrl = affiliateUrl(`https://www.akc.org/dog-breeds/${breed.slug}/`, 'akc');

  return (
    <div
      className="card"
      style={{
        padding: 0,
        animation,
        maxWidth: '100%',
        overflow: 'hidden',
        ...(isWildcard ? { borderColor: 'var(--accent)', boxShadow: '4px 4px 0 #FFE070' } : {}),
      }}
    >
      {/* Top-match portrait — the reveal's centerpiece: large, on a warm
          parchment surface with a soft evening-light shadow underneath.
          Other ranks + the wildcard keep the compact avatar header below. */}
      {isTopMatch && (
        <div style={{ position: 'relative', background: 'linear-gradient(180deg, var(--parchment), var(--parchment-edge))', padding: '24px 24px 28px' }}>
          <div
            style={{
              position: 'relative',
              maxWidth: '420px',
              margin: '0 auto',
              aspectRatio: '1 / 1',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 28px 34px -16px var(--parchment-shadow), 0 10px 14px -8px var(--parchment-shadow)',
            }}
          >
            <BreedImage slug={breed.slug} emoji={breed.emoji} circular={false} fill />
          </div>
          <div style={{ position: 'absolute', bottom: '10px', right: '20px', opacity: 0.3, display: 'flex' }}>
            <PawPrintMark size={30} color="var(--cta-text)" />
          </div>
        </div>
      )}

      {/* Medium tier — ranks #2/#3 and the wildcard. A scaled-down version of
          the #1 treatment: the breed portrait on the same warm parchment
          surface, sized between the old ~88px avatar and the #1 hero, so the
          whole results page reads as one system rather than one finished card
          plus placeholders. */}
      {!isTopMatch && (
        <div style={{ background: 'linear-gradient(180deg, var(--parchment), var(--parchment-edge))', padding: '20px' }}>
          <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
            <div style={{
              position: 'relative',
              width: 'clamp(120px, 34%, 190px)',
              flexShrink: 0,
              aspectRatio: '1 / 1',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 18px 24px -14px var(--parchment-shadow), 0 7px 10px -8px var(--parchment-shadow)',
            }}>
              <BreedImage slug={breed.slug} emoji={breed.emoji} circular={false} fill />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              {isWildcard ? (
                <span style={{ background: '#FFF8E0', color: '#B07800', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Icon icon={Sparkles} size={11} /> Unexpected match
                </span>
              ) : (
                <div style={{ fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--cta-text)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  <Icon icon={Medal} size={14} color={MEDAL_COLORS[rank] ?? MEDAL_COLORS[2]} />
                  Match #{rank + 1}
                </div>
              )}
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', lineHeight: 1.1, margin: '6px 0 10px', color: 'var(--text-primary)' }}>
                {breed.name}
              </h2>
              <span style={{ background: isWildcard ? 'var(--accent)' : '#0F6E56', color: isWildcard ? 'var(--text-primary)' : 'white', borderRadius: '20px', padding: '3px 10px', fontSize: '11px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                {fitPercent}% fit
              </span>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: isTopMatch ? '18px 20px 20px' : '16px 20px 20px' }}>

        {/* #1 header — medal / name / fit, below the hero portrait. Ranks #2/#3
            and the wildcard carry their header inside the parchment block above. */}
        {isTopMatch && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', marginBottom: '6px', display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--cta-text)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <Icon icon={Medal} size={13} color={MEDAL_COLORS[0]} />
              Your #1 match
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', lineHeight: 1.1, marginBottom: '8px', color: 'var(--text-primary)' }}>
              {breed.name}
            </h2>
            <span style={{ background: '#0F6E56', color: 'white', borderRadius: '20px', padding: '3px 10px', fontSize: '11px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              {fitPercent}% fit
            </span>
          </div>
        )}

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
          {/* Warm prose, not a bulleted spec-sheet — the reasons are already
              full sentences, so join them into one flowing note. */}
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {reasons.join(' ')}
          </p>
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
    </div>
  );
}
