import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Star } from 'lucide-react';

const MysteryBoxCollector = ({ collectedCount, totalRequired }) => {
  return (
    <div className="w-full max-w-4xl mx-auto z-10">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        <h2
          style={{ fontFamily: "'Poppins', sans-serif" }}
          className="text-yellow-300/90 font-semibold text-xs uppercase tracking-[0.2em]"
        >
          Your Mystery Boxes
        </h2>
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
      </div>
      <div
        className="flex flex-wrap justify-center gap-2 sm:gap-3 p-4 rounded-2xl border"
        style={{
          background: 'linear-gradient(135deg, rgba(61,12,110,0.4), rgba(122,0,32,0.4))',
          borderColor: 'rgba(245,197,24,0.25)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        }}
      >
        {Array.from({ length: totalRequired }).map((_, index) => {
          const isCollected = index < collectedCount;
          return (
            <div
              key={index}
              className={`
                w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl
                flex items-center justify-center
                border-2 transition-all duration-500
                ${isCollected
                  ? 'scale-100 border-yellow-400'
                  : 'border-white/10 scale-90 bg-black/20'}
              `}
              style={isCollected ? {
                background: 'linear-gradient(135deg, #f5c518, #e8a000)',
                boxShadow: '0 0 12px rgba(245,197,24,0.5)',
              } : {}}
            >
              {isCollected ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-red-900 drop-shadow-md" />
                </motion.div>
              ) : (
                <div className="w-2 h-2 rounded-full bg-white/20" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MysteryBoxCollector;
