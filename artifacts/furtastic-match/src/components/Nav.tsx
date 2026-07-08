import { Link } from 'react-router-dom';
import { PawPrint } from './CustomIcons';
import Icon, { BRAND_ACCENT } from './Icon';

export default function Nav() {
  return (
    <nav style={{ position: 'sticky', top: 0, borderBottom: '2px solid var(--border)', background: 'var(--bg-card)', zIndex: 100 }}>
      <div className="nav-inner" style={{ padding: '12px 24px', maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <Link to="/" data-testid="link-home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <span className="nav-paw" style={{ display: 'inline-flex', animation: 'wiggle 2s infinite ease-in-out' }}><Icon icon={PawPrint} size={26} color={BRAND_ACCENT} /></span>
          <span className="nav-logo-text" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px' }}>
            <span style={{ color: 'var(--cta)' }}>Furtastic</span>
            <span style={{ color: 'var(--teal)' }}>Match</span>
          </span>
        </Link>
        <Link to="/quiz" data-testid="link-quiz" className="btn-primary nav-cta" style={{ padding: '8px 16px', fontSize: '14px', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
          Find My Breed
        </Link>
      </div>
      <style>
        {`
          @keyframes wiggle {
            0%, 100% { transform: rotate(-5deg); }
            50% { transform: rotate(5deg); }
          }
        `}
      </style>
    </nav>
  );
}