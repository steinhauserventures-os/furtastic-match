import { useRef, useEffect, useState } from 'react';

interface CustomSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function CustomSlider({ value, onChange, min = 0, max = 100 }: CustomSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const percent = ((value - min) / (max - min)) * 100;

  const updateValue = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    let newPercent = ((clientX - rect.left) / rect.width) * 100;
    newPercent = Math.max(0, Math.min(100, newPercent));
    const newValue = Math.round((newPercent / 100) * (max - min) + min);
    onChange(newValue);
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    updateValue(clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      updateValue(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      updateValue(e.touches[0].clientX);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, min, max, onChange]);

  return (
    <div
      ref={trackRef}
      onMouseDown={handlePointerDown}
      onTouchStart={handlePointerDown}
      data-testid="slider-custom"
      style={{
        width: '100%',
        height: '32px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        touchAction: 'none',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '8px',
          borderRadius: '4px',
          background: '#EDE0FF',
          position: 'absolute',
        }}
      />
      <div
        style={{
          width: `${percent}%`,
          height: '8px',
          borderRadius: '4px',
          background: `linear-gradient(90deg, var(--cta), var(--teal))`,
          position: 'absolute',
        }}
      />
      <div
        style={{
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          background: 'white',
          border: '3px solid var(--cta)',
          position: 'absolute',
          left: `calc(${percent}% - 13px)`,
          boxShadow: '0 2px 8px rgba(91,63,217,0.3)',
          transition: isDragging ? 'none' : 'left 0.1s ease',
        }}
      />
    </div>
  );
}