import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Film } from 'lucide-react';

const POSTER_MAP = {
  "Hera Pheri": "hera pheri.jpg",
  "Bhool Bhulaiyaa": "Bhool_bhulaiyaa.jpg",
  "Bhagam Bhag": "bhagam bhag.jpg",
  "Hungama": "Hungama_poster.jpg",
  "Chup Chup Ke": "chup chup ke.jpg",
  "De Dana Dan": "de dhana dhan.jpg",
  "Welcome": "Welcome_poster_2007.jpg",
  "Hulchul": "hulchul.jpg",
  "Garam Masala": "garam masala.jpg",
  "Khatta Meetha": "katta-meeta-trisha-akshay-kumar.jpg",
  "Malamaal Weekly": "malamal weekly.jpg"
};

const getPosterUrl = (movie) => {
  const filename = POSTER_MAP[movie];
  return filename ? `/newGift/assets/posters/${filename}` : '';
};

const WRONG_MESSAGES = [
  "Arre bhai! Yeh toh bilkul galat hai! 😂",
  "Haan haan... bilkul nahi! 🙈",
  "Babu Rao bhi maar khayega yeh sun ke! 😭",
  "Itna bhi nahi pata? Sharam karo! 😤",
  "Hera Pheri ka hero bhi ro dega! 😹",
  "Yeh toh 'Raju' wali galti ho gayi! 🤦",
  "Ek baar aur sochna tha na bhai! 🙄",
  "Priyadarshan ji dukhi ho gaye honge! 😂",
  "25 din mein dimag double nahi hua kya? 😜",
];

const RIGHT_MESSAGES = [
  "Waah waah! Babu Rao proud hai! 🎉",
  "Ekdum correct! Hero wali baar! 🌟",
  "Arre wah! 'Raju' genius nikla! 🤩",
  "Bilkul sahi! Priyadarshan ji khush! 🎬",
  "Bhai tu toh champion hai! 🏆",
  "Sahi jawab! Mystery box mila! 🎁",
  "Shabash! Aage badho hero! 💪",
  "Ek dum jhakkas! 🔥",
];

const getRandomMessage = (arr) => arr[Math.floor(Math.random() * arr.length)];

const DialogueQuestionCard = ({ questionData, onCorrect }) => {
  const { dialogue, word, correctMovie, options } = questionData;
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  // Shuffle options ONCE per question so the correct answer isn't always first
  const shuffledOptions = useMemo(
    () => [...options].sort(() => Math.random() - 0.5),
    [dialogue] // re-shuffle only when question changes
  );

  const handleOptionClick = (option) => {
    if (selectedOption || isAnimating) return;

    setSelectedOption(option);
    const isCorrect = option === correctMovie;

    if (isCorrect) {
      setIsAnimating(true);
      setFeedbackMessage({ text: getRandomMessage(RIGHT_MESSAGES), isCorrect: true });
      setTimeout(() => { onCorrect(word); }, 1500);
    } else {
      setFeedbackMessage({ text: getRandomMessage(WRONG_MESSAGES), isCorrect: false });
      setTimeout(() => {
        setSelectedOption(null);
        setFeedbackMessage(null);
      }, 1200);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ type: 'spring', duration: 0.6 }}
      className="w-full max-w-2xl mx-auto mt-8 card-bollywood p-6 sm:p-10 rounded-3xl relative overflow-hidden"
    >
      {/* Decorative film holes top */}
      <div className="absolute top-0 left-0 right-0 h-2 flex gap-3 px-4 items-center opacity-40">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-yellow-400/60 flex-shrink-0" />
        ))}
      </div>
      {/* Decorative film holes bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-2 flex gap-3 px-4 items-center opacity-40">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-yellow-400/60 flex-shrink-0" />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">

        {/* Feedback Popup */}
        <AnimatePresence>
          {feedbackMessage && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: -40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 700 }}
              className={`absolute -top-6 left-0 right-0 z-30 mx-auto w-fit px-6 py-3 rounded-2xl text-base sm:text-lg text-center shadow-2xl border-2 ${
                feedbackMessage.isCorrect
                  ? 'bg-gradient-to-r from-green-700/90 to-emerald-500/90 border-yellow-300 text-yellow-100 shadow-green-500/50'
                  : 'bg-gradient-to-r from-red-800/90 to-rose-600/90 border-yellow-300 text-yellow-100 shadow-red-500/50'
              }`}
            >
              {feedbackMessage.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dialogue Card */}
        <motion.div
          className="mb-8 p-6 rounded-2xl border w-full text-center relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/newGift/assets/bg_red_stars.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderColor: 'rgba(245,197,24,0.5)',
            boxShadow: '0 0 24px rgba(0,0,0,0.6)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Film className="w-6 h-6 text-yellow-400" />
            <span
              style={{ fontFamily: "'Poppins', sans-serif" }}
              className="text-yellow-300 text-xs uppercase tracking-[0.2em] font-semibold"
            >
              Which Movie?
            </span>
            <Film className="w-6 h-6 text-yellow-400" />
          </div>
          <h3
            style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 700 }}
            className="text-xl sm:text-2xl md:text-3xl text-yellow-100 italic leading-snug"
          >
            "{dialogue}"
          </h3>
        </motion.div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 w-full px-2">
          <AnimatePresence>
            {shuffledOptions.map((option, index) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === correctMovie;

              let borderStyle = 'border-yellow-500/20 hover:border-yellow-400/60';
              if (isSelected && isCorrect) borderStyle = 'border-yellow-400 shadow-[0_0_24px_rgba(245,197,24,0.7)] scale-105';
              else if (isSelected && !isCorrect) borderStyle = 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] opacity-80 grayscale-[0.7]';
              else if (selectedOption && isCorrect) borderStyle = 'scale-95 opacity-40 grayscale';

              return (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={
                    isSelected && !isCorrect
                      ? { x: [-5, 5, -5, 5, 0], transition: { duration: 0.4 } }
                      : { opacity: 1, scale: 1, x: 0, y: 0 }
                  }
                  transition={{ delay: 0.3 + index * 0.1 }}
                  disabled={selectedOption !== null}
                  onClick={() => handleOptionClick(option)}
                  className={`relative rounded-2xl overflow-hidden border-4 bg-gray-900/60 transition-all duration-300 w-full aspect-[2/3] ${borderStyle}`}
                >
                  <img
                    src={getPosterUrl(option)}
                    alt={option}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/300x450/3d0c6e/f5c518?text=${encodeURIComponent(option)}`;
                    }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent flex items-end p-2 pointer-events-none">
                    <span
                      style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
                      className="text-yellow-200 text-xs sm:text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,1)] text-center leading-tight w-full"
                    >
                      {option}
                    </span>
                  </div>

                  {isSelected && isCorrect && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute top-2 right-2 bg-yellow-400/90 backdrop-blur p-1.5 sm:p-2 rounded-full shadow-lg"
                    >
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 text-black font-bold" />
                    </motion.div>
                  )}
                  {isSelected && !isCorrect && (
                    <motion.div
                      initial={{ scale: 0, rotate: 45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute top-2 right-2 bg-red-500/90 backdrop-blur p-1.5 sm:p-2 rounded-full shadow-lg"
                    >
                      <X className="w-5 h-5 sm:w-6 sm:h-6 text-white font-bold" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default DialogueQuestionCard;
