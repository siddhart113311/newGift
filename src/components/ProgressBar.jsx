import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full max-w-sm mx-auto mt-24 mb-6">
      <div className="flex justify-between items-center mb-2 px-1">
        <span
          style={{ fontFamily: "'Poppins', sans-serif" }}
          className="text-yellow-200/80 font-semibold text-sm uppercase tracking-widest"
        >
          Clues found
        </span>
        <span
          style={{ fontFamily: "'Luckiest Guy', cursive" }}
          className="text-gold-glow text-lg"
        >
          {current} / {total}
        </span>
      </div>
      <div className="h-4 w-full bg-black/40 rounded-full overflow-hidden shadow-inner border border-yellow-500/30">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="h-full rounded-full relative overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, #c0073a, #f5c518, #e8a000)',
            boxShadow: '0 0 10px rgba(245,197,24,0.6)',
          }}
        >
          {/* shimmer */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
              animation: 'shimmer 1.5s infinite',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
