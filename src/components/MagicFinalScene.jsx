import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

const MagicFinalScene = ({ words }) => {
  const [phase, setPhase] = useState(0); 
  // 0: Giant beating magical heart
  // 1: Heart explodes, Text reveals
  // 2: Yes clicked fireworks

  useEffect(() => {
    if (phase === 0) {
      // Heart beats for 2 seconds, then explode
      setTimeout(() => {
        confetti({
          particleCount: 300,
          spread: 160,
          origin: { y: 0.5 },
          colors: ['#d81b60', '#ffb300', '#f7f7ff', '#880e4f'],
          startVelocity: 45
        });
        setPhase(1);
      }, 2000); 
    }
  }, [phase]);

  const handleYesClick = () => {
    setPhase(2);
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: Math.random() - 0.2
        },
        colors: ['#d81b60', '#ffb300', '#f7f7ff', '#880e4f']
      });
    }, 250);
  };

  const sentence = words.join(" ") + "?";

  return (
    <div className="fixed inset-0 min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900 overflow-hidden text-center z-50">
      
      {/* Dark dynamic background */}
      <motion.div 
        className="absolute inset-0 bg-animated-gradient opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 0.5 : 0.2 }}
        transition={{ duration: 2 }}
      />

      <AnimatePresence>
        {/* Phase 0: The Beating Magical Heart */}
        {phase === 0 && (
          <motion.div
            key="beating-heart"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.4, 1, 1.6, 1],
              opacity: [0, 1, 1, 1, 1],
              filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)', 'brightness(2)', 'brightness(1)']
            }}
            exit={{ opacity: 0, scale: 3, filter: 'blur(20px)' }}
            transition={{ duration: 1.5, times: [0, 0.2, 0.4, 0.8, 1], ease: "easeInOut" }}
            className="absolute z-10"
          >
            <Heart className="w-48 h-48 md:w-64 md:h-64 text-romantic-pink fill-romantic-pink drop-shadow-[0_0_50px_rgba(216,27,96,1)]" />
          </motion.div>
        )}

        {/* Phase 1: Finale Text Reveal */}
        {phase >= 1 && (
          <motion.div
            key="finale-text"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, type: 'spring', bounce: 0.4 }}
            className="z-20 bg-romantic-dark/60 backdrop-blur-xl p-8 md:p-14 rounded-[3rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-4xl w-full"
          >
            <motion.div 
              className="text-6xl mb-8"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              💖
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-heading text-white drop-shadow-lg mb-12 leading-tight flex flex-wrap justify-center gap-x-3 gap-y-2">
              {sentence.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: i * 0.15 + 0.5, duration: 0.8 }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {phase === 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
                className="flex flex-col sm:flex-row gap-5 justify-center mt-8"
              >
                <button
                  onClick={handleYesClick}
                  className="bg-romantic-pink text-white px-10 py-5 rounded-full text-2xl font-bold shadow-[0_0_30px_rgba(216,27,96,0.6)] hover:bg-pink-600 hover:scale-105 transition-all flex items-center justify-center gap-3"
                >
                  <Heart className="w-8 h-8 fill-current animate-pulse" />
                  YES
                </button>
                <button
                  onClick={handleYesClick}
                  className="bg-white/10 backdrop-blur-md text-romantic-pink border border-romantic-pink/30 px-10 py-5 rounded-full text-2xl font-bold shadow-lg hover:bg-white/20 hover:scale-105 transition-all"
                >
                  😜 Obviously YES
                </button>
              </motion.div>
            )}

            {phase === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-12 text-4xl font-heading text-romantic-gold drop-shadow-md"
              >
                I knew you would say yes ❤️
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MagicFinalScene;
