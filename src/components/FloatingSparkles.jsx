/**
 * FloatingSparkles — Pure CSS version (no Framer Motion, GPU only)
 * Uses CSS animation instead of JS-driven Framer Motion to avoid
 * 30 separate JS animation loops. CSS animations run on the compositor thread.
 */
import React, { useMemo } from 'react';

const FloatingSparkles = ({ count = 12 }) => {
  const sparkles = useMemo(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 2,           // 2–5 px
      duration: `${(Math.random() * 2 + 1.5).toFixed(1)}s`,
      delay: `${(Math.random() * 3).toFixed(1)}s`,
    })),
  [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        @keyframes sparkle-pulse {
          0%, 100% { opacity: 0; transform: scale(0); }
          50%       { opacity: 0.75; transform: scale(1); }
        }
      `}</style>
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            boxShadow: '0 0 6px rgba(255,255,255,0.7)',
            animation: `sparkle-pulse ${s.duration} ${s.delay} ease-in-out infinite`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingSparkles;
