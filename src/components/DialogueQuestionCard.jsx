import React, { useState } from 'react';
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
  const [feedbackMessage, setFeedbackMessage] = useState(null); // { text, isCorrect }

  const handleOptionClick = (option) => {
    if (selectedOption || isAnimating) return;
    
    setSelectedOption(option);
    const isCorrect = option === correctMovie;

    if (isCorrect) {
      setIsAnimating(true);
      setFeedbackMessage({ text: getRandomMessage(RIGHT_MESSAGES), isCorrect: true });
      setTimeout(() => {
        onCorrect(word);
      }, 1500);
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
      transition={{ type: "spring", duration: 0.6 }}
      className="w-full max-w-2xl mx-auto mt-8 bg-white/10 backdrop-blur-md p-6 sm:p-10 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden group"
    >
      {/* Decorative quotes */}
      <div className="absolute top-0 left-0 text-9xl text-white/5 font-serif leading-none -mt-4 -ml-2 -scale-x-100">"</div>
      <div className="absolute bottom-0 right-0 text-9xl text-white/5 font-serif leading-none -mb-16 -mr-4">"</div>

      <div className="relative z-10 flex flex-col items-center">

        {/* Feedback Message Popup */}
        <AnimatePresence>
          {feedbackMessage && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: -40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className={`absolute -top-6 left-0 right-0 z-30 mx-auto w-fit px-6 py-3 rounded-2xl font-heading font-bold text-base sm:text-lg text-center shadow-2xl border-2 ${
                feedbackMessage.isCorrect
                  ? "bg-gradient-to-r from-green-600/90 to-emerald-500/90 border-green-300 text-white shadow-green-500/50"
                  : "bg-gradient-to-r from-red-700/90 to-rose-500/90 border-red-300 text-white shadow-red-500/50"
              }`}
            >
              {feedbackMessage.text}
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className="mb-8 p-6 bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-red-900/40 rounded-2xl border border-white/10 shadow-inner w-full text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Film className="w-8 h-8 text-pink-300 mx-auto mb-3 opacity-80" />
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-200 to-white italic">
            "{dialogue}"
          </h3>
          <p className="text-pink-200/60 text-sm mt-3 uppercase tracking-widest font-semibold">Which Movie?</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 w-full px-2">
          <AnimatePresence>
            {options.map((option, index) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === correctMovie;
              
              let buttonStyle = "border-white/10 opacity-90 hover:opacity-100 hover:scale-[1.03] hover:border-white/40 hover:z-10";
              
              if (isSelected) {
                if (isCorrect) {
                  buttonStyle = "border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.5)] scale-105 z-10 brightness-110";
                } else {
                  buttonStyle = "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] opacity-80 grayscale-[0.8]";
                }
              } else if (selectedOption && isCorrect) {
                 buttonStyle = "scale-95 opacity-50 grayscale"; // Dim others when correct
              }

              return (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={isSelected && !isCorrect ? { 
                    x: [-5, 5, -5, 5, 0],
                    transition: { duration: 0.4 }
                  } : { opacity: 1, scale: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                  disabled={selectedOption !== null}
                  onClick={() => handleOptionClick(option)}
                  className={`
                    relative rounded-2xl overflow-hidden border-4 bg-gray-900/50
                    transition-all duration-300 w-full aspect-[2/3] group-option
                    ${buttonStyle}
                  `}
                >
                  <img 
                    src={getPosterUrl(option)} 
                    alt={option}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                       // Fallback placeholder if image is missing
                       e.target.src = "https://via.placeholder.com/300x450/4a0024/ffb300?text=" + encodeURIComponent(option);
                    }}
                  />
                  
                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-2 sm:p-3 pointer-events-none">
                    <span className="text-white font-bold text-xs sm:text-sm md:text-base drop-shadow-[0_2px_4px_rgba(0,0,0,1)] text-center leading-tight w-full">
                      {option}
                    </span>
                  </div>
                  
                  {isSelected && isCorrect && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute top-2 right-2 bg-green-500/90 backdrop-blur p-1.5 sm:p-2 rounded-full shadow-lg"
                    >
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white font-bold" />
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
