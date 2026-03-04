import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full max-w-sm mx-auto mt-24 mb-6">
      <div className="flex justify-between items-center mb-2 px-1">
        <span className="text-gray-200 font-medium font-heading tracking-wide text-xl">Clues found</span>
        <span className="text-romantic-pink font-bold">{current} / {total}</span>
      </div>
      <div className="h-3 w-full bg-white/60 rounded-full overflow-hidden shadow-inner border border-white/40">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-romantic-pink to-romantic-gold rounded-full"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
