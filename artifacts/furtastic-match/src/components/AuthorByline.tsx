import { Link } from 'react-router-dom';
import { PenLine } from 'lucide-react';
import Icon from './Icon';

interface AuthorBylineProps {
  updatedDate?: string;
}

export default function AuthorByline({ updatedDate }: AuthorBylineProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px',
      background: 'var(--bg-card)',
      borderRadius: '8px',
      border: '1px solid var(--border)'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #3DBFB8, #6B4FBB)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <Icon icon={PenLine} size={22} color="white" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px' }}>
          <Link to="/about/author/editorial-team" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
            Editorial Team
          </Link>
        </div>
        {updatedDate && (
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Last updated: {updatedDate}
          </div>
        )}
      </div>
    </div>
  );
}
