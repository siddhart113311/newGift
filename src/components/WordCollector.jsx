import React from 'react';
import { motion } from 'framer-motion';

const WordCollector = ({ collectedWords, totalWords }) => {
  // Array of 9 words for layout placeholders.
  const placeholders = Array.from({ length: totalWords });

  return (
    <div className="fixed top-0 left-0 right-0 p-4 z-40 bg-romantic-dark/40 backdrop-blur-md shadow-sm border-b border-white/10">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2 md:gap-4">
        {placeholders.map((_, index) => {
          const word = collectedWords[index];
          return (
            <div 
              key={index} 
              className={`px-3 py-1.5 md:px-5 md:py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-500
                ${word 
                  ? 'bg-romantic-pink text-white shadow-[0_0_15px_rgba(216,27,96,0.6)] scale-100 opacity-100' 
                  : 'bg-white/10 text-gray-500 border border-romantic-pink/20 scale-95 opacity-70'}
              `}
            >
              {word ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {word}
                </motion.span>
              ) : (
                <span className="invisible">Word</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WordCollector;
