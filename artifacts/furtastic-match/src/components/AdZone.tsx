interface AdZoneProps {
  width: number;
  height: number;
  id: string;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}

export default function AdZone({ width, height, id, mobileOnly, desktopOnly }: AdZoneProps) {
  // <!-- AdZone placeholder for {id} -->
  return (
    <div
      data-testid={`display-ad-${id.replace(/\s+/g, '-')}`}
      style={{
        width: '100%',
        justifyContent: 'center',
        margin: '24px 0',
      }}
      className={`ad-zone ${mobileOnly ? 'ad-zone-mobile-only' : ''} ${desktopOnly ? 'ad-zone-desktop-only' : ''}`}
    >
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          maxWidth: '100%',
          border: '1px dashed #9B8FB5',
          background: '#F8F5FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          fontSize: '12px',
          fontFamily: 'var(--font-body)',
        }}
      >
        Ad Zone {id}
      </div>
    </div>
  );
}