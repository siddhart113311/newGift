import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FloatingSparkles = ({ count = 25 }) => {
  // Generate random properties once
  const sparkles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2, // 2px to 6px
      duration: Math.random() * 2 + 1.5, // 1.5s to 3.5s
      delay: Math.random() * 2,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={{ 
            x: `${sparkle.x}vw`, 
            y: `${sparkle.y}vh`, 
            scale: 0,
            opacity: 0
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut"
          }}
          className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          style={{ width: sparkle.size, height: sparkle.size }}
        />
      ))}
    </div>
  );
};

export default FloatingSparkles;
