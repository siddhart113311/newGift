import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-xl"
      >
        <h1 className="text-5xl md:text-7xl font-heading text-romantic-pink mb-6 drop-shadow-sm">
          The Ultimate Priyadarshan Dialogue Challenge 🎬
        </h1>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={onStart}
        className="mt-8 flex items-center justify-center gap-2 bg-gradient-to-r from-romantic-pink to-romantic-teal text-white px-8 py-4 rounded-full text-xl font-medium shadow-[0_0_20px_rgba(216,27,96,0.4)] hover:shadow-[0_0_30px_rgba(216,27,96,0.6)] transition-all"
      >
        <Heart className="w-6 h-6 fill-current animate-pulse" />
        Start the Love Quest
      </motion.button>
    </div>
  );
};

export default LandingPage;
