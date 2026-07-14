import { useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useCanonical } from '../hooks/useCanonical';

export default function AffiliateDisclosure() {
  useCanonical('https://furtasticmatch.com/affiliate-disclosure');
  useEffect(() => {
    document.title = "Affiliate Disclosure | FurtasticMatch";
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <main style={{ flex: 1, maxWidth: '800px', margin: '0 auto', width: '100%', padding: '60px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 42px)', marginBottom: '8px' }}>
          Affiliate Disclosure
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '40px' }}>Last updated: January 2026</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontSize: '16px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>FTC Disclosure</h2>
            <p>FurtasticMatch participates in affiliate marketing programs. This means we may earn a commission when you click on certain links on our website and make a purchase or take another qualifying action. This comes at no additional cost to you.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Amazon Associates</h2>
            <p>FurtasticMatch is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. As an Amazon Associate, we earn from qualifying purchases.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Breeder Links</h2>
            <p>Some of the "Find a Breeder" links on our breed profile pages are affiliate links. When you click through and contact or purchase from a breeder through these links, we may receive a referral fee. This does not influence our breed recommendations, which are determined solely by our matching algorithm based on your quiz answers.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Our Commitment to Objectivity</h2>
            <p>Our breed matching algorithm is completely objective and is never influenced by affiliate relationships. The breeds we recommend to you are based entirely on how well they match your lifestyle answers — not on which breeds offer us higher commissions.</p>
            <p style={{ marginTop: '12px' }}>We only recommend breeders and products that we believe provide genuine value. Affiliate income helps us keep FurtasticMatch free and ad-supported rather than behind a paywall.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Sponsored Content</h2>
            <p>FurtasticMatch may occasionally feature sponsored breed profiles or breeder listings. Any sponsored content will be clearly labeled as such. Sponsored status does not affect how breeds rank in your quiz results.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Questions?</h2>
            <p>If you have questions about our affiliate relationships or how we earn revenue, please <a href="/contact" style={{ color: 'var(--cta-text)' }}>contact us</a>. We are committed to full transparency.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
