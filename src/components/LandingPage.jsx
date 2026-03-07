import React from 'react';
import { motion } from 'framer-motion';
import { Film, Star } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4 text-center relative"
      style={{
        backgroundImage: `url('/newGift/assets/bg_purple.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Content sits above overlay */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Stars row */}
        <div className="flex gap-3 mb-6">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              <Star className="w-6 h-6 fill-current text-yellow-400" />
            </motion.div>
          ))}
        </div>

        {/* Cinema marquee banner */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="cinema-ribbon px-6 py-2 rounded-full mb-4 flex items-center gap-2"
        >
          <Film className="w-5 h-5 text-yellow-300" />
          <span
            style={{ fontFamily: "'Poppins', sans-serif" }}
            className="text-yellow-200 text-sm font-semibold uppercase tracking-widest"
          >
            Priyadarshan Presents
          </span>
          <Film className="w-5 h-5 text-yellow-300" />
        </motion.div>

        {/* MAIN TITLE — Luckiest Guy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring', bounce: 0.4, delay: 0.2 }}
          className="max-w-2xl"
        >
          <h1
            style={{ fontFamily: "'Luckiest Guy', cursive" }}
            className="text-gold-glow text-5xl md:text-7xl leading-tight drop-shadow-2xl"
          >
            The Ultimate
            <br />
            <span className="text-white" style={{ WebkitTextStroke: '2px #f5c518' }}>
              Dialogue
            </span>
            <br />
            Challenge!
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ fontFamily: "'Baloo 2', cursive" }}
            className="text-yellow-200/80 text-xl md:text-2xl font-semibold mt-4"
          >
            🎬 Can you name all the movies? 🎬
          </motion.p>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          onClick={onStart}
          className="mt-10 border-marquee animate-marquee flex items-center justify-center gap-3 bg-gradient-to-r from-red-700 to-red-900 text-yellow-300 px-10 py-4 rounded-full shadow-2xl transition-all"
          style={{
            fontFamily: "'Luckiest Guy', cursive",
            fontSize: '1.5rem',
            letterSpacing: '0.05em',
          }}
        >
          🎟️ Start the Love Quest
        </motion.button>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.8 }}
          style={{ fontFamily: "'Poppins', sans-serif" }}
          className="mt-6 text-yellow-100/60 text-sm tracking-wide"
        >
          Unlock a secret message by answering all 9 clues!
        </motion.p>

      </div>
    </div>
  );
};

export default LandingPage;
