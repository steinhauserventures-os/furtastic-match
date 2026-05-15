import { useState, useEffect, Fragment } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import AdZone from '../components/AdZone';
import EmailCapture from '../components/EmailCapture';
import { trackEvent } from '../lib/analytics';
import { decodeResults, getBreedById, Breed } from '../lib/matchingEngine';
import BreedImage from '../components/BreedImage';

export default function Results() {
  const [searchParams] = useSearchParams();
  const [matches, setMatches] = useState<Breed[]>([]);
  const [wildcard, setWildcard] = useState<Breed | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Inject noindex
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);

    trackEvent('quiz_complete_view');

    const hash = searchParams.get('r');
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
          <div style={{ fontSize: '64px', animation: 'scaleUp 0.5s ease-out forwards', marginBottom: '24px' }}>🐾</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '42px', marginBottom: '8px', textAlign: 'center' }}>Your matches are ready!</h1>
          <p style={{ opacity: 0.9, marginBottom: '40px', fontSize: '18px' }}>We've found the perfect dogs for your lifestyle.</p>
          <button className="btn-accent" style={{ padding: '16px 40px', fontSize: '18px' }} onClick={() => setRevealed(true)}>
            Reveal My Matches 🐾
          </button>
          <style>{`@keyframes scaleUp { from { transform: scale(0); } to { transform: scale(1); } }`}</style>
        </div>
      )}

      <Nav />

      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '40px 24px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '48px', minWidth: 0 }} className="results-grid">
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0, overflow: 'hidden' }}>
          <div>
            <div style={{ color: 'var(--teal)', fontFamily: 'var(--font-body)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px', marginBottom: '8px' }}>🎉 Your personalized matches</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '36px', marginBottom: '8px' }}>Here are your perfect breeds</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Based on your lifestyle, space, and family</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '16px' }}>
            {matches.map((breed, i) => (
              <Fragment key={breed.id}>
                <div className="card" style={{ padding: '24px', animation: revealed ? `fadeInUp 0.5s ease both ${(i*400)+100}ms` : 'none', maxWidth: '100%', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ width: '76px', height: '76px', borderRadius: '12px', background: `linear-gradient(135deg, ${breed.illustration_bg[0]}, ${breed.illustration_bg[1]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0, overflow: 'hidden' }}>
                      <BreedImage slug={breed.slug} emoji={breed.emoji} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', marginBottom: '4px' }}>{i === 0 ? '🥇 Match #1' : i === 1 ? '🥈 Match #2' : '🥉 Match #3'}</div>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', lineHeight: 1.1, marginBottom: '8px' }}>{breed.name}</h2>
                      <span style={{ background: 'var(--cta)', color: 'white', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: 700 }}>⚡ {95 - i*8}% fit</span>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
                    {breed.why_it_fits.family}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a
                      href="https://embarkvet.com?utm_source=furtasticmatch&utm_medium=results-page&utm_campaign=affiliate"
                      target="_blank" rel="noopener noreferrer"
                      onClick={() => trackEvent('breeder_click', { breed: breed.name, cta: 'dna_test' })}
                      className="btn-primary"
                      style={{ display: 'flex', justifyContent: 'center', padding: '12px 16px', textDecoration: 'none' }}
                    >
                      🧬 Test Your Future Pup's DNA
                    </a>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', fontStyle: 'italic', margin: 0 }}>
                      Affiliate link — we may earn a small commission at no cost to you.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <a
                        href={`https://marketplace.akc.org/puppies/${breed.slug}?utm_source=furtasticmatch&utm_medium=results-page&utm_campaign=affiliate`}
                        target="_blank" rel="noopener noreferrer"
                        className="btn-outline"
                        style={{ padding: '10px 8px', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                      >
                        🏅 Find AKC Breeders
                      </a>
                      <a
                        href={`https://www.gooddog.com/breeds/${breed.slug}?utm_source=furtasticmatch&utm_medium=results-page&utm_campaign=affiliate`}
                        target="_blank" rel="noopener noreferrer"
                        className="btn-outline"
                        style={{ padding: '10px 8px', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                      >
                        🐾 Browse on GoodDog
                      </a>
                      <a
                        href={`https://www.chewy.com/s?query=${encodeURIComponent(breed.name)}&utm_source=furtasticmatch&utm_medium=results-page&utm_campaign=affiliate`}
                        target="_blank" rel="noopener noreferrer"
                        className="btn-outline"
                        style={{ padding: '10px 8px', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gridColumn: '1 / -1' }}
                      >
                        🛒 Shop {breed.name} Essentials
                      </a>
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>
                      Are you a {breed.name} breeder?{' '}
                      <Link to="/breeders" style={{ color: 'var(--cta)', textDecoration: 'none', fontWeight: 700 }}>
                        Get featured here →
                      </Link>
                    </p>
                    <Link
                      to={`/breeds/${breed.slug}`}
                      className="btn-outline"
                      style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '13px' }}
                    >
                      Learn More About {breed.name}
                    </Link>
                  </div>
                </div>
                {i === 0 && <AdZone width={300} height={250} id="ADSENSE UNIT 3" mobileOnly />}
              </Fragment>
            ))}

            {wildcard && (
              <div className="card" style={{ padding: '24px', borderColor: 'var(--accent)', boxShadow: '4px 4px 0 #FFE070', animation: revealed ? `fadeInUp 0.5s ease both 1400ms` : 'none' }}>
                <div style={{ color: '#B07800', fontWeight: 800, fontSize: '14px', marginBottom: '16px' }}>🎲 Wildcard Pick</div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ width: '76px', height: '76px', borderRadius: '12px', background: `linear-gradient(135deg, ${wildcard.illustration_bg[0]}, ${wildcard.illustration_bg[1]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0, overflow: 'hidden' }}>
                    <BreedImage slug={wildcard.slug} emoji={wildcard.emoji} />
                  </div>
                  <div>
                    <span style={{ background: '#FFF8E0', color: '#B07800', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 700, marginBottom: '4px', display: 'inline-block' }}>✦ Unexpected match</span>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', lineHeight: 1.1, marginBottom: '8px' }}>{wildcard.name}</h2>
                    <span style={{ background: 'var(--accent)', color: 'var(--text-primary)', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: 700 }}>⚡ 82% fit</span>
                  </div>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
                  {wildcard.why_it_fits.family}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a
                    href="https://embarkvet.com?utm_source=furtasticmatch&utm_medium=results-page&utm_campaign=affiliate"
                    target="_blank" rel="noopener noreferrer"
                    onClick={() => trackEvent('breeder_click', { breed: wildcard.name, cta: 'dna_test' })}
                    className="btn-accent"
                    style={{ display: 'flex', justifyContent: 'center', padding: '12px 16px', textDecoration: 'none' }}
                  >
                    🧬 Test Your Future Pup's DNA
                  </a>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', fontStyle: 'italic', margin: 0 }}>
                    Affiliate link — we may earn a small commission at no cost to you.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <a
                      href={`https://marketplace.akc.org/puppies/${wildcard.slug}?utm_source=furtasticmatch&utm_medium=results-page&utm_campaign=affiliate`}
                      target="_blank" rel="noopener noreferrer"
                      className="btn-outline"
                      style={{ padding: '10px 8px', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                    >
                      🏅 Find AKC Breeders
                    </a>
                    <a
                      href={`https://www.gooddog.com/breeds/${wildcard.slug}?utm_source=furtasticmatch&utm_medium=results-page&utm_campaign=affiliate`}
                      target="_blank" rel="noopener noreferrer"
                      className="btn-outline"
                      style={{ padding: '10px 8px', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                    >
                      🐾 Browse on GoodDog
                    </a>
                    <a
                      href={`https://www.chewy.com/s?query=${encodeURIComponent(wildcard.name)}&utm_source=furtasticmatch&utm_medium=results-page&utm_campaign=affiliate`}
                      target="_blank" rel="noopener noreferrer"
                      className="btn-outline"
                      style={{ padding: '10px 8px', fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gridColumn: '1 / -1' }}
                    >
                      🛒 Shop {wildcard.name} Essentials
                    </a>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>
                    Are you a {wildcard.name} breeder?{' '}
                    <Link to="/breeders" style={{ color: 'var(--cta)', textDecoration: 'none', fontWeight: 700 }}>
                      Get featured here →
                    </Link>
                  </p>
                  <Link
                    to={`/breeds/${wildcard.slug}`}
                    className="btn-outline"
                    style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '13px' }}
                  >
                    Learn More About {wildcard.name}
                  </Link>
                </div>
              </div>
            )}

            <AdZone width={728} height={90} id="ADSENSE UNIT 5" desktopOnly />
          </div>

          <div style={{ animation: revealed ? `fadeInUp 0.5s ease both 1900ms` : 'none' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', marginTop: '32px' }}>
              FurtasticMatch participates in affiliate programs. We earn a commission if you make a purchase through our breeder links, including as an Amazon Associate, at no extra cost to you.
            </p>
            <EmailCapture />
          </div>

          <div style={{ animation: revealed ? `fadeInUp 0.5s ease both 2100ms` : 'none', background: 'var(--bg-card)', padding: '24px', borderRadius: '18px', border: '2px solid var(--border)' }}>
            <div style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '11px', fontWeight: 700, marginBottom: '16px' }}>Share your results</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button className="btn-primary" style={{ gridColumn: '1 / -1', padding: '12px', justifyContent: 'center' }} onClick={() => handleShare('native')}>📱 Share Results</button>
              <button className="btn-outline" style={{ padding: '12px', fontSize: '14px' }} onClick={() => handleShare('facebook')}>👥 Facebook</button>
              <button className="btn-outline" style={{ padding: '12px', fontSize: '14px' }} onClick={() => handleShare('reddit')}>🟠 Reddit</button>
              <button className="btn-outline" style={{ gridColumn: '1 / -1', padding: '12px', fontSize: '14px' }} onClick={() => handleShare('copy')}>🔗 Copy Link</button>
            </div>
          </div>

        </div>

        <div className="hidden md:flex flex-col gap-6" style={{ width: '300px', position: 'sticky', top: '100px', alignSelf: 'start' }}>
          <AdZone width={300} height={250} id="ADSENSE UNIT 4" desktopOnly />
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🐾</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>Are you a breeder?</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>Reach families specifically searching for your breed.</p>
            <Link to="/breeders" className="btn-outline" style={{ display: 'block', textAlign: 'center', padding: '8px', textDecoration: 'none', fontSize: '14px' }}>Learn More</Link>
          </div>
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