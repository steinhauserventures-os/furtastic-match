import { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Breeders() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulate form submission to VITE_FORMSPREE_BREEDER_ENDPOINT
      setSubmitted(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <main style={{ flex: 1, maxWidth: '600px', margin: '0 auto', width: '100%', padding: '60px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 42px)', textAlign: 'center', marginBottom: '16px' }}>
          Reach Families Searching for Your Breed
        </h1>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '18px', marginBottom: '48px' }}>
          Join our network to be featured directly in quiz results when families match with your breed.
        </p>

        {submitted ? (
          <div className="card" style={{ padding: '40px', textAlign: 'center', background: '#F0FFF4', borderColor: '#3DBFB8' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✨</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Thanks for your interest!</h3>
            <p style={{ color: 'var(--text-secondary)' }}>We'll reach out when sponsored placements are available.</p>
          </div>
        ) : (
          <form className="card" style={{ padding: '32px' }} onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>Breeder/Business Name *</label>
                <input type="text" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>Email *</label>
                <input type="email" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>Phone</label>
                <input type="tel" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>Breeds you specialize in (comma-separated)</label>
                <input type="text" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>State *</label>
                <input type="text" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>Message</label>
                <textarea rows={4} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }}></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ padding: '16px', justifyContent: 'center', marginTop: '8px' }}>Join the Waitlist →</button>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}