import { useState } from 'react';
import { Mail, MailCheck } from 'lucide-react';
import Icon from './Icon';
import { trackEvent } from '../lib/analytics';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      // POST directly to Formspree endpoint mlgzarlp (Results Email Capture)
      await fetch('https://formspree.io/f/mlgzarlp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'quiz',
          url: window.location.href,
        }),
      });
      setSubmitted(true);
      trackEvent('email_capture');
    } catch (error) {
      console.error('Email capture error:', error);
    }
  };

  if (skipped) return null;

  return (
    <div className="card" style={{ padding: '24px', margin: '32px 0', textAlign: 'center' }}>
      {submitted ? (
        <div data-testid="display-email-success" style={{ color: 'var(--teal)', fontWeight: 700, fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Icon icon={MailCheck} size={20} /> Sent! Check your inbox.
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center' }}><Icon icon={Mail} size={32} color="var(--cta)" /></div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>Save your results</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '15px' }}>
            Enter your email to save these matches or share them with family.
          </p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', maxWidth: '400px', margin: '0 auto' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-label="Email address"
              data-testid="input-email-capture"
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '12px',
                border: '2px solid var(--border)',
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
              }}
              required
            />
            <button type="submit" className="btn-primary" data-testid="button-email-submit" style={{ padding: '12px 24px' }}>
              Save
            </button>
          </form>
          <button
            type="button"
            onClick={() => setSkipped(true)}
            data-testid="button-email-skip"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '14px',
              marginTop: '16px',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            No thanks, I'll just share the link
          </button>
        </>
      )}
    </div>
  );
}