import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Heart, Star } from 'lucide-react';

const SpinningMysteryBoxes = ({ targetSentence }) => {
  const [openedBoxes, setOpenedBoxes] = useState([]);
  const [showProposal, setShowProposal] = useState(false);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [accepted, setAccepted] = useState(false);

  const radius = window.innerWidth < 640 ? 120 : 200;

  const fireConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, colors: ['#f5c518', '#c0073a', '#ffffff', '#6a0dad'], origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, colors: ['#f5c518', '#c0073a', '#ffffff', '#6a0dad'], origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  const totalBoxes = targetSentence.length;

  useEffect(() => {
    if (openedBoxes.length === totalBoxes) {
      setTimeout(() => { setShowProposal(true); fireConfetti(); }, 2000);
    }
  }, [openedBoxes, totalBoxes]);

  const handleBoxClick = (index) => {
    if (!openedBoxes.includes(index)) {
      setOpenedBoxes(prev => [...prev, index]);
    }
  };

  const handleAccepted = () => {
    setAccepted(true);
    fireConfetti();
    fireConfetti();
  };

  const moveNoButton = () => {
    const x = Math.random() * (window.innerWidth - 100) - window.innerWidth / 2 + 50;
    const y = Math.random() * (window.innerHeight - 100) - window.innerHeight / 2 + 50;
    setNoButtonStyle({ transform: `translate(${x}px, ${y}px)`, position: 'absolute' });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url('/newGift/assets/bg_purple.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      {/* Revealed Sentence at top */}
      <div className="absolute top-8 sm:top-16 w-full px-4 flex flex-wrap justify-center gap-2 sm:gap-3">
        {targetSentence.map((word, index) => {
          const isRevealed = openedBoxes.includes(index);
          return (
            <AnimatePresence key={index}>
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 80 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className="px-3 py-1.5 sm:px-5 sm:py-2 rounded-full border-2"
                  style={{
                    background: 'linear-gradient(135deg, rgba(61,12,110,0.7), rgba(122,0,32,0.7))',
                    borderColor: '#f5c518',
                    boxShadow: '0 0 12px rgba(245,197,24,0.4)',
                  }}
                >
                  <span
                    style={{ fontFamily: "'Luckiest Guy', cursive", letterSpacing: '0.05em' }}
                    className="text-xl sm:text-3xl text-gold-glow"
                  >
                    {word}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* Spinning Boxes OR Proposal */}
      {!showProposal ? (
        <div className="relative w-full h-full flex flex-col items-center justify-center mt-24">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="relative"
            style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
          >
            {targetSentence.map((_, index) => {
              const angle = (index / totalBoxes) * 2 * Math.PI;
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);
              const isOpened = openedBoxes.includes(index);

              return (
                <motion.div
                  key={index}
                  className="absolute left-1/2 top-1/2 cursor-pointer"
                  style={{ x, y }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  whileHover={{ scale: isOpened ? 1 : 1.25 }}
                  onClick={() => handleBoxClick(index)}
                >
                  <AnimatePresence mode="wait">
                    {!isOpened ? (
                      <motion.div
                        key="closed"
                        exit={{ scale: 0, opacity: 0, rotate: 180 }}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-xl animate-pulse flex items-center justify-center border-2 border-yellow-300"
                        style={{
                          background: 'linear-gradient(135deg, #f5c518, #e8a000)',
                          boxShadow: '0 0 20px rgba(245,197,24,0.6)',
                        }}
                      >
                        <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-red-900" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="opened"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-yellow-500/30 flex items-center justify-center backdrop-blur-sm"
                        style={{ background: 'rgba(61,12,110,0.4)' }}
                      >
                        <span className="text-3xl">✨</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontFamily: "'Poppins', sans-serif" }}
            className="mt-6 text-yellow-300/70 text-sm uppercase tracking-widest font-semibold"
          >
            🎁 Click the boxes to open!
          </motion.p>
        </div>
      ) : (
        /* Final Proposal UI */
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center mt-20"
        >
          {!accepted ? (
            <div
              className="p-8 sm:p-12 rounded-3xl border-2 shadow-2xl max-w-2xl w-full"
              style={{
                background: 'linear-gradient(135deg, rgba(61,12,110,0.7), rgba(122,0,32,0.7))',
                borderColor: '#f5c518',
                boxShadow: '0 0 40px rgba(245,197,24,0.3)',
              }}
            >
              {/* Stars */}
              <div className="flex justify-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5, 1], rotate: [0, 20, -20, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  >
                    <Star className="w-6 h-6 fill-current text-yellow-400" />
                  </motion.div>
                ))}
              </div>

              <Heart className="w-20 h-20 text-red-500 mx-auto mb-4 animate-pulse" fill="currentColor" />

              <h1
                style={{ fontFamily: "'Luckiest Guy', cursive", letterSpacing: '0.05em' }}
                className="text-4xl sm:text-5xl text-gold-glow mb-4 leading-tight"
              >
                Well... What's your answer?
              </h1>

              <p
                style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 600 }}
                className="text-yellow-200/70 text-lg mb-8"
              >
                Aap ne toh mystery solve kar diya... ab ek aur jawab? 😉
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[100px] w-full">
                <button
                  onClick={handleAccepted}
                  className="px-10 py-4 text-red-950 rounded-full font-bold text-2xl shadow-xl transform hover:scale-110 transition-all duration-300 z-20 border-2 border-yellow-300"
                  style={{
                    background: 'linear-gradient(135deg, #f5c518, #e8a000)',
                    fontFamily: "'Luckiest Guy', cursive",
                    letterSpacing: '0.05em',
                    boxShadow: '0 0 24px rgba(245,197,24,0.6)',
                  }}
                >
                  Yes, of course! ❤️
                </button>

                <button
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  style={{ ...noButtonStyle, fontFamily: "'Poppins', sans-serif" }}
                  className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white/60 border border-white/20 rounded-full font-bold text-xl transition-colors duration-300 z-10"
                >
                  No 😢
                </button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="text-center"
            >
              <Heart className="w-32 h-32 text-red-500 mx-auto mb-8 animate-bounce" fill="currentColor" />
              <h1
                style={{ fontFamily: "'Luckiest Guy', cursive", letterSpacing: '0.08em' }}
                className="text-6xl sm:text-8xl text-gold-glow mb-6 drop-shadow-2xl"
              >
                YAYYY! 🎉
              </h1>
              <p
                style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 600 }}
                className="text-2xl sm:text-4xl text-yellow-200"
              >
                Get ready for the best date ever! 💖
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default SpinningMysteryBoxes;
