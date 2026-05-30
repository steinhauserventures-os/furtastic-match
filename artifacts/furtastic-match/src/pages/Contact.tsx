import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Icon from '../components/Icon';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact FurtasticMatch | Get in Touch";
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      await fetch('https://formspree.io/f/mgodrevp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Contact form error:', error);
    }
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
                <input name="name" type="text" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>Email</label>
                <input name="email" type="email" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>Message</label>
                <textarea name="message" rows={5} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }}></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ padding: '16px', justifyContent: 'center', marginTop: '8px' }}>Send Message <Icon icon={ArrowRight} size={18} /></button>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}