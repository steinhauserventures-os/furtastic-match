import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact FurtasticMatch | Get in Touch";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <main style={{ flex: 1, maxWidth: '600px', margin: '0 auto', width: '100%', padding: '60px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 42px)', textAlign: 'center', marginBottom: '16px' }}>
          Contact Us
        </h1>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '18px', marginBottom: '48px' }}>
          Have a question, feedback, or partnership inquiry? We'd love to hear from you.
        </p>

        {submitted ? (
          <div className="card" style={{ padding: '40px', textAlign: 'center', background: '#F0FFF4', borderColor: '#3DBFB8' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Thanks!</h3>
            <p style={{ color: 'var(--text-secondary)' }}>We'll get back to you within 48 hours.</p>
          </div>
        ) : (
          <form className="card" style={{ padding: '32px' }} onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>Name</label>
                <input type="text" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>Email</label>
                <input type="email" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>Message</label>
                <textarea rows={5} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }}></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ padding: '16px', justifyContent: 'center', marginTop: '8px' }}>Send Message →</button>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}