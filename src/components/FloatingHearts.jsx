/**
 * FloatingHearts — Pure CSS version (no Framer Motion)
 * Runs on the compositor thread (GPU), not JS main thread.
 * Count reduced from 20 → 8 to further reduce paint area.
 */
import React, { useMemo } from 'react';

const FloatingHearts = ({ count = 8 }) => {
  const hearts = useMemo(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 12 + 8,          // 8–20 px
      duration: `${(Math.random() * 8 + 10).toFixed(1)}s`,
      delay: `${(Math.random() * 8).toFixed(1)}s`,
      opacity: (Math.random() * 0.2 + 0.05).toFixed(2),
    })),
  [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        @keyframes float-up {
          0%   { transform: translateY(110vh) rotate(-15deg); opacity: 0; }
          10%  { opacity: var(--op); }
          90%  { opacity: var(--op); }
          100% { transform: translateY(-10vh) rotate(15deg); opacity: 0; }
        }
      `}</style>
      {hearts.map((h) => (
        <div
          key={h.id}
          style={{
            position: 'absolute',
            left: h.left,
            bottom: 0,
            width: h.size,
            height: h.size,
            '--op': h.opacity,
            animation: `float-up ${h.duration} ${h.delay} linear infinite`,
            willChange: 'transform, opacity',
          }}
        >
          {/* SVG heart — no extra library */}
          <svg viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)" width="100%" height="100%">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                     2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                     C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                     c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
