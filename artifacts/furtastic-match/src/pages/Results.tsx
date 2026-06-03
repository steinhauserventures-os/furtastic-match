import { useState, useEffect, Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PawPrint, PartyPopper, Share2, Link2 } from 'lucide-react';
import { FaFacebook, FaReddit } from 'react-icons/fa';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import AdZone from '../components/AdZone';
import EmailCapture from '../components/EmailCapture';
import AffiliateCard from '../components/AffiliateCard';
import MatchCard from '../components/MatchCard';
import Icon from '../components/Icon';
import { trackEvent } from '../lib/analytics';
import { decodeResults, getBreedById, Breed, QuizAnswers } from '../lib/matchingEngine';

export default function Results() {
  const [searchParams] = useSearchParams();
  const [matches, setMatches] = useState<Breed[]>([]);
  const [wildcard, setWildcard] = useState<Breed | null>(null);
  const [revealed, setRevealed] = useState(false);
  // Quiz answers (from sessionStorage) power the per-card "why this matched you" block.
  // Null on a shared link / new device — cards fall back to non-personalized copy.
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);

  useEffect(() => {
    // Inject noindex
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);

    trackEvent('quiz_complete_view');

    const hash = searchParams.get('r');

    // Only use stored answers if they belong to THIS result (hash match), so
    // personalization never bleeds onto a shared link opened in the same tab.
    try {
      const raw = sessionStorage.getItem('fm_quiz_answers');
      if (raw) {
        const stored = JSON.parse(raw) as { hash: string; answers: QuizAnswers };
        if (stored.hash === hash) setAnswers(stored.answers);
      }
    } catch {
      // unparseable / unavailable — leave answers null, cards degrade gracefully
    }

    if (hash) {
      const { matchIds, wildcardId } = decodeResults(hash);
      const m = matchIds.map(id => getBreedById(id)).filter(Boolean) as Breed[];
      setMatches(m);
      if (wildcardId) {
        setWildcard(getBreedById(wildcardId) || null);
      }
    }

    return () => {
      document.head.removeChild(meta);
    };
  }, [searchParams]);

  if (matches.length === 0) return null;

  const handleShare = (method: string) => {
    trackEvent('share_click', { method });
    const url = `${window.location.origin}${window.location.pathname}?r=${searchParams.get('r')}`;
    
    if (method === 'native' && navigator.share) {
      navigator.share({
        title: 'My FurtasticMatch Results',
        text: 'I just found my perfect dog breeds! Take the 3-minute quiz.',
        url
      }).catch(console.error);
    } else if (method === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${url}&utm_source=share&utm_medium=facebook&utm_campaign=organic_share`)}`, '_blank');
    } else if (method === 'reddit') {
      navigator.clipboard.writeText(`Just took this dog breed quiz and got ${matches.map(m => m.name).join(', ')}.\n\nTake it here: ${url}`);
      alert('Copied format for Reddit!');
    } else if (method === 'copy') {
      navigator.clipboard.writeText(`${url}&utm_source=share&utm_medium=social&utm_campaign=organic_share`);
      alert('Link copied!');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {!revealed && (
        <div style={{ position: 'fixed', inset: 0, background: 'var(--cta)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <div style={{ animation: 'scaleUp 0.5s ease-out forwards', marginBottom: '24px', display: 'flex' }}><Icon icon={PawPrint} size={64} color="white" /></div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '42px', marginBottom: '8px', textAlign: 'center' }}>Your matches are ready!</h1>
          <p style={{ opacity: 0.9, marginBottom: '40px', fontSize: '18px' }}>We've found the perfect dogs for your lifestyle.</p>
          <button className="btn-accent" style={{ padding: '16px 40px', fontSize: '18px', display: 'inline-flex', alignItems: 'center', gap: '8px' }} onClick={() => setRevealed(true)}>
            Reveal My Matches <Icon icon={PawPrint} size={20} />
          </button>
          <style>{`@keyframes scaleUp { from { transform: scale(0); } to { transform: scale(1); } }`}</style>
        </div>
      )}

      <Nav />

      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '40px 24px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '48px', minWidth: 0 }} className="results-grid">
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0, overflow: 'hidden' }}>
          <div>
            <div style={{ color: 'var(--teal)', fontFamily: 'var(--font-body)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px', marginBottom: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Icon icon={PartyPopper} size={14} /> Your personalized matches</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '36px', marginBottom: '8px' }}>Here are your perfect breeds</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Based on your lifestyle, space, and family</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '16px' }}>
            {matches.map((breed, i) => (
              <Fragment key={breed.id}>
                <MatchCard
                  breed={breed}
                  rank={i}
                  fitPercent={95 - i * 8}
                  revealed={revealed}
                  animationDelayMs={i * 400 + 100}
                  answers={answers}
                />
                {i === 0 && <AdZone width={300} height={250} id="ADSENSE UNIT 3" mobileOnly />}
              </Fragment>
            ))}

            {wildcard && (
              <MatchCard
                breed={wildcard}
                isWildcard
                fitPercent={82}
                revealed={revealed}
                animationDelayMs={1400}
                answers={answers}
              />
            )}

            <AdZone width={728} height={90} id="ADSENSE UNIT 5" desktopOnly />
          </div>

          <div style={{ animation: revealed ? `fadeInUp 0.5s ease both 1900ms` : 'none' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', marginTop: '32px' }}>
              FurtasticMatch participates in affiliate programs. We earn a commission if you make a purchase through our breeder links, including as an Amazon Associate, at no extra cost to you.
            </p>
            <EmailCapture />
          </div>

          <div style={{ animation: revealed ? `fadeInUp 0.5s ease both 2000ms` : 'none' }}>
            <AffiliateCard breedName={matches[0].name} variant="results" />
          </div>

          <div style={{ animation: revealed ? `fadeInUp 0.5s ease both 2100ms` : 'none', background: 'var(--bg-card)', padding: '24px', borderRadius: '18px', border: '2px solid var(--border)' }}>
            <div style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '11px', fontWeight: 700, marginBottom: '16px' }}>Share your results</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button className="btn-primary" style={{ gridColumn: '1 / -1', padding: '12px', justifyContent: 'center' }} onClick={() => handleShare('native')}><Icon icon={Share2} size={16} /> Share Results</button>
              <button className="btn-outline" style={{ padding: '12px', fontSize: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={() => handleShare('facebook')}><FaFacebook size={16} /> Facebook</button>
              <button className="btn-outline" style={{ padding: '12px', fontSize: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={() => handleShare('reddit')}><FaReddit size={16} /> Reddit</button>
              <button className="btn-outline" style={{ gridColumn: '1 / -1', padding: '12px', fontSize: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }} onClick={() => handleShare('copy')}><Icon icon={Link2} size={16} /> Copy Link</button>
            </div>
          </div>

        </div>

        {/* Generic "Are you a breeder?" sidebar widget removed — the per-card,
            breed-specific BreederIntentCTA is stronger. AdZone slot retained. */}
        <div className="hidden md:flex flex-col gap-6" style={{ width: '300px', position: 'sticky', top: '100px', alignSelf: 'start' }}>
          <AdZone width={300} height={250} id="ADSENSE UNIT 4" desktopOnly />
        </div>

      </main>

      <AdZone width={320} height={50} id="ADSENSE UNIT 6" mobileOnly />

      <Footer />
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 768px) { .results-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
