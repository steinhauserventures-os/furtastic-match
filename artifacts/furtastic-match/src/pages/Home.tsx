import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dog, Sparkles, PawPrint, Check, Zap, Target, PartyPopper, ArrowRight, BookOpen } from '../components/CustomIcons';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import AdZone from '../components/AdZone';
import Icon, { BRAND_ACCENT } from '../components/Icon';
import breedsData from '../data/breeds.json';
import BreedImage from '../components/BreedImage';
import { useCanonical } from '../hooks/useCanonical';

export default function Home() {
  useCanonical('https://furtasticmatch.com/');
  useEffect(() => {
    document.title = 'FurtasticMatch — Find Your Perfect Dog Breed in 3 Minutes';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Free dog breed matching quiz. Answer 8 questions about your lifestyle and we\'ll match you with the right breed from 40 options. No sign-up required.');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'FurtasticMatch — Find Your Perfect Dog Breed in 3 Minutes');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', 'Free dog breed matching quiz. Answer 8 questions and find the right breed for your family.');
  }, []);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "FurtasticMatch",
    "url": "https://furtasticmatch.com",
    "logo": "https://furtasticmatch.com/opengraph.jpg",
    "description": "Free dog breed matching quiz that helps families find the right breed and connect with reputable breeders.",
    "sameAs": []
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <Nav />
      
      {/* Hero — led by the breed portraits themselves, not a badge/headline
          template. Same warm parchment surface as the reveal; teal stays
          scoped to the CTA. */}
      <section style={{ background: 'linear-gradient(180deg, var(--parchment), var(--parchment-edge))', padding: '56px 24px' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }} className="hero-grid">

          <div className="hero-portraits" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '380px', aspectRatio: '1 / 1' }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '20px',
                overflow: 'hidden',
                transform: 'rotate(-3deg)',
                boxShadow: '0 26px 34px -16px var(--parchment-shadow), 0 10px 14px -8px var(--parchment-shadow)',
              }}>
                <BreedImage slug="golden-retriever" emoji="🐶" circular={false} fill />
              </div>
              <div style={{
                position: 'absolute',
                width: '52%',
                aspectRatio: '1 / 1',
                bottom: '-7%',
                left: '-9%',
                borderRadius: '16px',
                overflow: 'hidden',
                transform: 'rotate(6deg)',
                border: '4px solid var(--parchment)',
                boxShadow: '0 18px 24px -12px var(--parchment-shadow)',
              }}>
                <BreedImage slug="pembroke-welsh-corgi" emoji="🐕" circular={false} fill />
              </div>
            </div>
          </div>

          <div>
            <div style={{ color: 'var(--cta-text)', fontFamily: 'var(--font-body)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px', marginBottom: '14px' }}>
              Free · 3 minutes · No sign-up
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.1, marginBottom: '20px', color: 'var(--text-primary)' }}>
              Find the dog breed that actually fits your life
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.6, maxWidth: '460px' }}>
              Answer 8 quick questions about your space, family, and lifestyle — we'll match you with the breeds that fit best, out of 40 options.
            </p>
            <Link to="/quiz" data-testid="link-hero-quiz" className="btn-primary" style={{ padding: '16px 40px', fontSize: '17px', textDecoration: 'none' }}>
              Find My Perfect Breed <Icon icon={Dog} size={20} />
            </Link>
            <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-muted)' }}>
              <Icon icon={Sparkles} size={14} style={{ verticalAlign: '-0.125em', marginRight: '4px' }} />40 breeds · Personalized results · Free forever
            </p>
          </div>

        </div>
      </section>

      {/* Trust bar */}
      <section style={{ background: 'var(--bg-card)', borderTop: '2px solid var(--border)', borderBottom: '2px solid var(--border)', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          {[
            { icon: Dog, n: '40', l: 'Breeds' },
            { icon: Check, n: '', l: 'Free. No sign-up required.' },
            { icon: Zap, n: '3 Min', l: 'Quiz' },
            { icon: Target, n: '', l: '100% Personalized' }
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ display: 'flex' }}><Icon icon={t.icon} size={26} color={BRAND_ACCENT} /></div>
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '32px', marginBottom: '32px' }}>Three steps to your perfect match <Icon icon={PawPrint} size={28} color={BRAND_ACCENT} style={{ verticalAlign: '-0.15em' }} /></h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
              {[
                { i: 1, icon: Target, t: 'Tell us about your life', d: 'Answer 8 quick questions about your space, family, and lifestyle' },
                { i: 2, icon: Zap, t: 'We run the match', d: 'Our algorithm scores 40 breeds against your answers in seconds' },
                { i: 3, icon: PartyPopper, t: 'Meet your matches', d: 'Get your top 3 matches plus a wildcard breed you might not expect' }
              ].map((s) => (
                <div key={s.i} className="card" style={{ padding: '24px', position: 'relative' }}>
                  <div style={{ width: '28px', height: '28px', background: 'var(--cta)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 800, position: 'absolute', top: '-14px', left: '24px' }}>{s.i}</div>
                  <div style={{ marginBottom: '16px', marginTop: '8px' }}><Icon icon={s.icon} size={32} color={BRAND_ACCENT} /></div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>{s.t}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5 }}>{s.d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Breed Guides */}
          <section>
            <div style={{ color: 'var(--teal)', fontFamily: 'var(--font-body)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px', marginBottom: '8px' }}>Breed guides</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '32px', marginBottom: '24px' }}>
              Read before you decide <Icon icon={BookOpen} size={26} color={BRAND_ACCENT} style={{ verticalAlign: '-0.15em' }} />
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              {[
                { slug: 'hypoallergenic-dog-breeds', title: 'Best Hypoallergenic Dog Breeds', desc: 'A complete guide for allergy-sensitive families — small, medium & large options.', tag: 'Breed Guide' },
                { slug: 'golden-retriever-vs-labrador', title: 'Golden Retriever vs. Labrador', desc: 'Head-to-head comparison: temperament, grooming, health, and which is right for you.', tag: 'Comparison' },
              ].map(a => (
                <Link key={a.slug} to={`/learn/${a.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="card" style={{ padding: '20px 24px', height: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ background: 'var(--bg-muted)', color: 'var(--cta)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '3px 10px', borderRadius: '8px', alignSelf: 'flex-start' }}>{a.tag}</span>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', lineHeight: 1.3 }}>{a.title}</div>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, flex: 1 }}>{a.desc}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--cta)', fontWeight: 700, fontSize: '13px', marginTop: '4px' }}>Read guide <Icon icon={ArrowRight} size={14} /></div>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/learn" style={{ color: 'var(--cta)', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
              Browse all breed guides →
            </Link>
          </section>

          {/* Breed Chips */}
          <section>
            <div style={{ color: 'var(--teal)', fontFamily: 'var(--font-body)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px', marginBottom: '16px' }}>40 breeds in our database</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
              {breedsData.slice(0, 40).map((b) => (
                <Link key={b.id} to={`/breeds/${b.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="card" style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'transform 0.15s ease, box-shadow 0.15s ease', cursor: 'pointer' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = ''; }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `linear-gradient(135deg, ${b.illustration_bg[0]}, ${b.illustration_bg[1]})`, flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                      <BreedImage slug={b.slug} emoji={b.emoji} size={32} circular={false} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11.5px', lineHeight: 1.2, wordBreak: 'break-word' }}>{b.name}</span>
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

      {/* Bottom CTA — warm parchment surface (matching the hero), so the teal
          btn-primary reads as the same CTA as "Find My Perfect Breed" above.
          Teal is scoped to the button, per the redesign direction. */}
      <section style={{
        background: 'linear-gradient(180deg, var(--parchment), var(--parchment-edge))',
        color: 'var(--text-primary)',
        padding: '80px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(120,76,24,0.06) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 42px)', marginBottom: '16px' }}>
            Ready to find your perfect match? <Icon icon={PawPrint} size={32} color={BRAND_ACCENT} style={{ verticalAlign: '-0.15em' }} />
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '17px', marginBottom: '32px' }}>
            Takes 3 minutes. No email required. Share with the whole family.
          </p>
          <Link to="/quiz" data-testid="link-bottom-quiz" className="btn-primary" style={{ padding: '14px 36px', fontSize: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            Start the Quiz <Icon icon={ArrowRight} size={18} />
          </Link>
        </div>
      </section>

      <Footer />
      <style>
        {`
          @media (max-width: 768px) {
            .home-grid { grid-template-columns: 1fr !important; }
            .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
            .hero-portraits { order: -1; margin-bottom: 8px; }
          }
        `}
      </style>
    </div>
  );
}