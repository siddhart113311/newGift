import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Heart } from 'lucide-react';

const SpinningMysteryBoxes = ({ targetSentence }) => {
  const [openedBoxes, setOpenedBoxes] = useState([]);
  const [showProposal, setShowProposal] = useState(false);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [accepted, setAccepted] = useState(false);

  const radius = window.innerWidth < 640 ? 120 : 200; // responsive radius
  const fireConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  const totalBoxes = targetSentence.length;

  useEffect(() => {
    // Check if all boxes are opened
    if (openedBoxes.length === totalBoxes) {
      setTimeout(() => {
        setShowProposal(true);
        fireConfetti();
      }, 2000);
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
    fireConfetti(); // double confetti!
  };

  const moveNoButton = () => {
    const x = Math.random() * (window.innerWidth - 100) - window.innerWidth / 2 + 50;
    const y = Math.random() * (window.innerHeight - 100) - window.innerHeight / 2 + 50;
    setNoButtonStyle({ transform: `translate(${x}px, ${y}px)`, position: 'absolute' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/90 backdrop-blur-md overflow-hidden">
      
      {/* Revealed Sentence Display at top */}
      <div className="absolute top-10 sm:top-20 w-full px-4 flex flex-wrap justify-center gap-3">
        {targetSentence.map((word, index) => {
           // We use the index to correctly map opened boxes to their target word
           // We use the index to correctly map opened boxes to their target word
           const isRevealed = openedBoxes.includes(index);

           return (
             <AnimatePresence key={index}>
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 100 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="bg-white/20 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-white/30 shadow-lg"
                >
                  <span className="text-xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300">
                    {word}
                  </span>
                </motion.div>
              )}
             </AnimatePresence>
           );
        })}
      </div>

      {/* Spinning Boxes OR Final Proposal */}
      {!showProposal ? (
        <div className="relative w-full h-full flex items-center justify-center mt-20">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
                  animate={{ rotate: -360 }} // Counter-rotate so boxes stay upright
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  whileHover={{ scale: isOpened ? 1 : 1.2 }}
                  onClick={() => handleBoxClick(index)}
                >
                  <AnimatePresence mode="wait">
                    {!isOpened ? (
                      <motion.div
                        key="closed"
                        exit={{ scale: 0, opacity: 0, rotate: 180 }}
                        className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-xl shadow-yellow-500/50 border-2 border-yellow-200 flex items-center justify-center animate-pulse"
                      >
                         <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="opened"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center backdrop-blur-sm"
                      >
                        <span className="text-3xl">✨</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
          <div className="absolute font-bold text-white/50 text-center uppercase tracking-widest text-sm sm:text-base animate-pulse">
            Click them to open
          </div>
        </div>
      ) : (
        /* The Final Proposal UI */
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center mt-20"
        >
          {!accepted ? (
            <div className="bg-white/10 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-white/20 shadow-2xl max-w-2xl w-full">
              <Heart className="w-20 h-20 text-red-500 mx-auto mb-6 animate-pulse" fill="currentColor" />
              <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-red-300 mb-10 drop-shadow-md">
                Well... What's your answer?
              </h1>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 relative min-h-[100px] w-full">
                <button 
                  onClick={handleAccepted}
                  className="px-10 py-4 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white rounded-full font-bold text-2xl shadow-xl shadow-pink-500/30 transform hover:scale-110 transition-all duration-300 z-20"
                >
                  Yes, of course! ❤️
                </button>
                
                <button 
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  style={noButtonStyle}
                  className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full font-bold text-2xl transition-colors duration-300 z-10"
                >
                  No 😢
                </button>
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="text-center"
            >
              <Heart className="w-32 h-32 text-red-500 mx-auto mb-8 animate-bounce" fill="currentColor" />
              <h1 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 mb-6 drop-shadow-lg">
                YAYYY! 🎉
              </h1>
              <p className="text-2xl sm:text-4xl text-white/90 font-medium">
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
