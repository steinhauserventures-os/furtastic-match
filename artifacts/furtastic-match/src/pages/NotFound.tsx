import { Link } from 'react-router-dom';
import { Dog } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Icon, { BRAND_ACCENT } from '../components/Icon';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <main style={{ flex: 1, padding: '80px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ marginBottom: '24px' }}><Icon icon={Dog} size={64} color={BRAND_ACCENT} /></div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 800, marginBottom: '16px' }}>Looks like you're lost</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', marginBottom: '32px' }}>We couldn't find the page you were looking for.</p>
        <Link to="/" className="btn-primary" style={{ padding: '12px 32px', textDecoration: 'none' }}>Go Home</Link>
      </main>
      <Footer />
    </div>
  );
}