import React from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

const MysteryBoxCollector = ({ collectedCount, totalRequired }) => {
  return (
    <div className="w-full max-w-4xl mx-auto z-10">
      <h2 className="text-center text-white/90 font-medium mb-4 text-sm uppercase tracking-wider">
        Your Mystery Boxes
      </h2>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
        {Array.from({ length: totalRequired }).map((_, index) => {
          const isCollected = index < collectedCount;
          return (
            <div 
              key={index}
              className={`
                w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg 
                flex items-center justify-center
                shadow-inner border
                transition-all duration-500
                ${isCollected 
                  ? 'bg-gradient-to-br from-yellow-300 to-yellow-600 border-yellow-200 shadow-yellow-500/50 scale-100' 
                  : 'bg-white/5 border-white/10 scale-95'}
              `}
            >
              {isCollected ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-md" />
                </motion.div>
              ) : (
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MysteryBoxCollector;
