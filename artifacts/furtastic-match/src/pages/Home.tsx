import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import AdZone from '../components/AdZone';
import breedsData from '../data/breeds.json';
import BreedImage from '../components/BreedImage';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      
      {/* Hero */}
      <section style={{ 
        padding: '80px 24px', 
        textAlign: 'center', 
        position: 'relative',
        backgroundImage: 'radial-gradient(circle, #EDE0FF 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,251,240,0.85)' }}></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '6px 16px', 
            background: '#FFF8E0', 
            border: '2px solid #FFBE00', 
            borderRadius: '20px',
            color: '#B07800',
            fontWeight: 800,
            fontSize: '13px',
            marginBottom: '24px'
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFBE00', animation: 'pulse 2s infinite' }}></div>
            Free · 3 Minutes · No Sign-Up
          </div>
          
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(36px, 8vw, 58px)', lineHeight: 1.1, marginBottom: '24px' }}>
            Find Your <span style={{ position: 'relative', display: 'inline-block' }}><span style={{ position: 'absolute', bottom: '-2px', left: '-2px', right: '-2px', height: '8px', background: 'var(--accent)', opacity: 0.55, borderRadius: '3px', zIndex: 0 }}></span><span style={{ position: 'relative', zIndex: 1 }}>Perfect</span></span> Dog in 3 Minutes
          </h1>
          
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto', lineHeight: 1.6 }}>
            Answer 8 fun questions about your lifestyle and we'll match you with the breeds that fit your family best. No fluff, no email required.
          </p>
          
          <Link to="/quiz" data-testid="link-hero-quiz" className="btn-primary" style={{ padding: '16px 40px', fontSize: '17px', textDecoration: 'none' }}>
            Find My Perfect Breed 🐶
          </Link>
          
          <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-muted)' }}>
            ✦ 30 breeds · Personalized results · Free forever
          </p>
        </div>
      </section>

      {/* Trust bar */}
      <section style={{ background: 'var(--bg-card)', borderTop: '2px solid var(--border)', borderBottom: '2px solid var(--border)', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          {[
            { e: '🐕', n: '30', l: 'Breeds' },
            { e: '✅', n: '', l: 'Free. No sign-up required.' },
            { e: '⚡', n: '3 Min', l: 'Quiz' },
            { e: '🎯', n: '', l: '100% Personalized' }
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ fontSize: '24px' }}>{t.e}</div>
              {t.n && <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--cta)', fontSize: '18px' }}>{t.n}</div>}
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{t.l}</div>
            </div>
          ))}
        </div>
      </section>

      <AdZone width={728} height={90} id="ADSENSE UNIT 1" desktopOnly />
      <AdZone width={320} height={50} id="ADSENSE UNIT 1 mobile" mobileOnly />

      {/* Main Content Area */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '60px 24px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '60px' }} className="home-grid">
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          {/* How It Works */}
          <section>
            <div style={{ color: 'var(--teal)', fontFamily: 'var(--font-body)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px', marginBottom: '8px' }}>How it works</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '32px', marginBottom: '32px' }}>Three steps to your perfect match 🐾</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
              {[
                { i: 1, e: '🎯', t: 'Tell us about your life', d: 'Answer 8 quick questions about your space, family, and lifestyle' },
                { i: 2, e: '⚡', t: 'We run the match', d: 'Our algorithm scores 30 breeds against your answers in seconds' },
                { i: 3, e: '🎉', t: 'Meet your matches', d: 'Get your top 3 matches plus a wildcard breed you might not expect' }
              ].map((s) => (
                <div key={s.i} className="card" style={{ padding: '24px', position: 'relative' }}>
                  <div style={{ width: '28px', height: '28px', background: 'var(--cta)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800, position: 'absolute', top: '-14px', left: '24px' }}>{s.i}</div>
                  <div style={{ fontSize: '32px', marginBottom: '16px', marginTop: '8px' }}>{s.e}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>{s.t}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5 }}>{s.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Breed Chips */}
          <section>
            <div style={{ color: 'var(--teal)', fontFamily: 'var(--font-body)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px', marginBottom: '16px' }}>30 breeds in our database</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
              {breedsData.slice(0, 30).map((b) => (
                <Link key={b.id} to={`/breeds/${b.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="card" style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'transform 0.15s ease, box-shadow 0.15s ease', cursor: 'pointer' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = ''; }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `linear-gradient(135deg, ${b.illustration_bg[0]}, ${b.illustration_bg[1]})`, flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                      <BreedImage slug={b.slug} emoji={b.emoji} emojiFontSize="18px" />
                    </div>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="hidden md:block" style={{ width: '300px', position: 'sticky', top: '100px', alignSelf: 'start' }}>
          <AdZone width={300} height={250} id="ADSENSE UNIT 2" desktopOnly />
        </div>

      </div>

      {/* Bottom CTA */}
      <section style={{ 
        background: 'var(--cta)', 
        color: 'white', 
        padding: '80px 24px', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 42px)', marginBottom: '16px' }}>
            Ready to find your perfect match? 🐾
          </h2>
          <p style={{ opacity: 0.85, fontSize: '17px', marginBottom: '32px' }}>
            Takes 3 minutes. No email required. Share with the whole family.
          </p>
          <Link to="/quiz" data-testid="link-bottom-quiz" className="btn-accent" style={{ padding: '14px 36px', fontSize: '16px', display: 'inline-block', textDecoration: 'none' }}>
            Start the Quiz →
          </Link>
        </div>
      </section>

      <Footer />
      <style>
        {`
          @media (max-width: 768px) {
            .home-grid { grid-template-columns: 1fr !important; }
          }
        `}
      </style>
    </div>
  );
}