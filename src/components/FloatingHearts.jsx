import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FloatingHearts = ({ count = 15 }) => {
  // Generate random properties for hearts once on mount
  const hearts = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage string
      y: Math.random() * 100 + 100, // start below screen
      size: Math.random() * 15 + 10, // 10px to 25px
      duration: Math.random() * 10 + 10, // 10s to 20s
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.1, // 0.1 to 0.4
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ 
            x: `${heart.x}vw`, 
            y: `${heart.y}vh`, 
            opacity: 0,
            rotate: -20
          }}
          animate={{
            y: '-10vh', // float up past top of screen
            opacity: [0, heart.opacity, heart.opacity, 0],
            rotate: 20
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
          className="absolute"
        >
          <Heart 
            className="fill-current text-white/50" 
            style={{ width: heart.size, height: heart.size }} 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
