import { Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';
import Icon from './Icon';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--text-primary)', color: 'white', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
        <Link to="/" data-testid="link-footer-home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', color: 'white' }}>
          <Icon icon={PawPrint} size={24} color="white" />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px' }}>FurtasticMatch</span>
        </Link>
        
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/about" data-testid="link-footer-about" style={{ color: 'white', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>About</Link>
          <Link to="/contact" data-testid="link-footer-contact" style={{ color: 'white', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>Contact</Link>
          <Link to="/privacy" data-testid="link-footer-privacy" style={{ color: 'white', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>Privacy Policy</Link>
          <Link to="/affiliate-disclosure" data-testid="link-footer-disclosure" style={{ color: 'white', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>Affiliate Disclosure</Link>
          <Link to="/breeders" data-testid="link-footer-breeders" style={{ color: 'white', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>For Breeders</Link>
        </div>
        
        <div style={{ marginTop: '24px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', fontSize: '14px', textAlign: 'center' }}>
          © 2026 FurtasticMatch. All rights reserved.
        </div>
      </div>
    </footer>
  );
}