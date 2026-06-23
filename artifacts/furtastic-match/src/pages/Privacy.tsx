import { useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useCanonical } from '../hooks/useCanonical';

export default function Privacy() {
  useCanonical('https://furtasticmatch.com/privacy');
  useEffect(() => {
    document.title = "Privacy Policy | FurtasticMatch";
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <main style={{ flex: 1, maxWidth: '800px', margin: '0 auto', width: '100%', padding: '60px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 42px)', marginBottom: '8px' }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '40px' }}>Last updated: May 2026</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontSize: '16px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Information We Collect</h2>
            <p>FurtasticMatch does not require you to create an account or provide any personal information to use our quiz. The quiz answers you provide are processed entirely in your browser and are not stored on our servers.</p>
            <p style={{ marginTop: '12px' }}>If you voluntarily submit your email address through our email capture form, we collect and store that address solely to send you dog breed tips and updates. We will never sell your email address to third parties.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Analytics</h2>
            <p>We use Google Analytics 4 (GA4) to understand how visitors use our site. GA4 collects anonymized data such as pages visited, time on page, and general geographic region. This data is aggregated and cannot be used to identify you personally. You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cta)' }}>Google Analytics Opt-out Browser Add-on</a>.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Cookies</h2>
            <p>We use cookies only for analytics purposes (Google Analytics). We do not use cookies to track you across other websites or to serve targeted advertising. You can disable cookies in your browser settings at any time.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Affiliate Links</h2>
            <p>Some links on FurtasticMatch are affiliate links. This means we may earn a small commission if you make a purchase through those links, at no additional cost to you. We only link to products and services we believe are relevant and useful to our visitors. Affiliate relationships do not influence our breed recommendations or quiz results in any way.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Third-Party Links</h2>
            <p>Our site contains links to breeder websites and other third-party services. We are not responsible for the privacy practices of those sites. We encourage you to review their privacy policies before providing any personal information.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Advertising</h2>
            <p>We may display advertisements through Google AdSense or similar networks. These networks may use cookies to serve ads based on your prior visits to our site or other sites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cta)' }}>Google Ads Settings</a>.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Children's Privacy</h2>
            <p>FurtasticMatch is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us and we will delete it promptly.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of FurtasticMatch after changes constitutes acceptance of the revised policy.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Contact</h2>
            <p>If you have questions about this Privacy Policy, please <a href="https://furtasticmatch.com/contact" style={{ color: 'var(--cta)' }}>contact us</a>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
