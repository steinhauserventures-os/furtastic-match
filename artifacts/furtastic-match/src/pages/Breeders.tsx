import { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import { useCanonical } from '../hooks/useCanonical';

export default function Breeders() {
  useCanonical('https://furtasticmatch.com/breeders');
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    document.title = "Get Featured as a Breeder | FurtasticMatch";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Are you a reputable breeder? Join the FurtasticMatch breeder network and get featured to thousands of families actively searching for their perfect breed.');
  }, []);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');

    // Apply E.164 US format: +1 (XXX) XXX-XXXX
    if (digits.length === 0) return '';
    if (digits.length <= 1) return `+${digits}`;
    if (digits.length <= 4) return `+${digits.slice(0, 1)} (${digits.slice(1)}`;
    if (digits.length <= 7) return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4)}`;
    return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    e.target.value = formatted;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Strip formatting from phone before submission (keep only digits)
    const rawPhone = (formData.get('phone') as string || '').replace(/\D/g, '');

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: rawPhone,
      breeds: formData.get('breeds'),
      city: formData.get('city'),
      state: formData.get('state'),
      zip: formData.get('zip'),
      kennel_name: formData.get('kennel_name'),
      website: formData.get('website'),
      social: formData.get('social'),
      message: formData.get('message'),
      source: 'breeder',
    };

    try {
      await fetch('https://formspree.io/f/mlgzaedb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Breeder waitlist error:', error);
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
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}><Icon icon={CheckCircle2} size={48} color="#3DBFB8" /></div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Thanks for your interest!</h3>
            <p style={{ color: 'var(--text-secondary)' }}>We'll reach out when sponsored placements are available.</p>
          </div>
        ) : (
          <form className="card" style={{ padding: '32px' }} onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Required Fields (7) */}
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>Your Name *</label>
                <input name="name" type="text" required placeholder="First and last name" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>Email *</label>
                <input name="email" type="email" required placeholder="you@example.com" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>Phone *</label>
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="+1 (555) 555-5555"
                  pattern="^\+1 \(\d{3}\) \d{3}-\d{4}$"
                  title="Phone must be in format: +1 (555) 555-5555"
                  onChange={handlePhoneChange}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }}
                />
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Format: +1 (555) 555-5555</p>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>Breed(s) You Specialize In *</label>
                <input name="breeds" type="text" required placeholder="e.g., Labrador Retriever, Golden Retriever" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>City *</label>
                <input name="city" type="text" required placeholder="City name" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>State *</label>
                <input name="state" type="text" required placeholder="e.g., CA, TX, NY" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>ZIP Code *</label>
                <input
                  name="zip"
                  type="text"
                  required
                  placeholder="e.g., 90210"
                  pattern="^\d{5}(-\d{4})?$"
                  title="Enter a valid US ZIP code"
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>Kennel/Business Name *</label>
                <input name="kennel_name" type="text" required placeholder="Your kennel or business name" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>Website or Listing URL *</label>
                <input name="website" type="url" required placeholder="https://yourwebsite.com or GoodDog/AKC profile link" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }} />
              </div>

              {/* Optional Fields (2) */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', marginTop: '8px' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px', fontStyle: 'italic' }}>Optional Information</p>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>Social Media Profile</label>
                <input name="social" type="text" placeholder="Instagram, Facebook, or other profile URL" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>Additional Information</label>
                <textarea name="message" rows={4} placeholder="Tell us about your breeding program, certifications, or anything else..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid var(--border)' }}></textarea>
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '16px', justifyContent: 'center', marginTop: '8px' }}>Join the Waitlist <Icon icon={ArrowRight} size={18} /></button>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}