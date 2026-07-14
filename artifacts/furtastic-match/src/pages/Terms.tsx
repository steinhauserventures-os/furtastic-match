import { useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Terms() {
  useEffect(() => {
    document.title = "Terms of Service | FurtasticMatch";
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <main style={{ flex: 1, maxWidth: '800px', margin: '0 auto', width: '100%', padding: '60px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 42px)', marginBottom: '8px' }}>
          Terms of Service
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '40px' }}>Last updated: May 2026</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontSize: '16px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Acceptance of Terms</h2>
            <p>By accessing and using FurtasticMatch, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use this service.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Use of Service</h2>
            <p>FurtasticMatch provides a free dog breed matching quiz and informational content about dog breeds. The service is provided "as is" for informational and entertainment purposes only.</p>
            <p style={{ marginTop: '12px' }}>You agree to use FurtasticMatch only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>No Professional Advice</h2>
            <p>The information provided by FurtasticMatch is for general informational purposes only. Our breed recommendations and content do not constitute professional veterinary, behavioral, or legal advice.</p>
            <p style={{ marginTop: '12px' }}>Before making any decisions about acquiring or caring for a dog, you should consult with qualified professionals such as veterinarians, certified dog trainers, or breed-specific experts.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Quiz Results</h2>
            <p>The breed matching quiz is based on general breed characteristics and your self-reported preferences. Results are suggestions only and should not be considered definitive or guaranteed to be accurate for your specific situation.</p>
            <p style={{ marginTop: '12px' }}>Individual dogs within a breed can vary significantly in temperament, energy level, and other characteristics. We strongly recommend meeting any dog in person and working with reputable breeders or adoption agencies before making a commitment.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Third-Party Links</h2>
            <p>FurtasticMatch contains links to third-party websites, including breeder websites, affiliate partners, and other resources. We are not responsible for the content, accuracy, or practices of these third-party sites.</p>
            <p style={{ marginTop: '12px' }}>Links to breeders do not constitute an endorsement or guarantee of the quality, ethical practices, or legitimacy of those breeders. You are responsible for conducting your own due diligence before engaging with any breeder or purchasing any product.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Limitation of Liability</h2>
            <p>FurtasticMatch and its operators shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of or inability to use the service, including but not limited to decisions made based on quiz results or information provided on the site.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Intellectual Property</h2>
            <p>All content on FurtasticMatch, including but not limited to text, graphics, logos, and software, is the property of FurtasticMatch or its content suppliers and is protected by copyright and other intellectual property laws.</p>
            <p style={{ marginTop: '12px' }}>You may not reproduce, distribute, modify, or create derivative works from any content on FurtasticMatch without express written permission.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>User Conduct</h2>
            <p>You agree not to use FurtasticMatch to:</p>
            <ul style={{ marginTop: '12px', paddingLeft: '24px' }}>
              <li>Upload, post, or transmit any content that is unlawful, harmful, threatening, abusive, harassing, or otherwise objectionable</li>
              <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity</li>
              <li>Interfere with or disrupt the service or servers or networks connected to the service</li>
              <li>Attempt to gain unauthorized access to any portion of the website or any other systems or networks</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of FurtasticMatch after changes are posted constitutes your acceptance of the modified terms.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', marginBottom: '12px' }}>Contact</h2>
            <p>If you have questions about these Terms of Service, please <a href="/contact" style={{ color: 'var(--cta-text)' }}>contact us</a>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
