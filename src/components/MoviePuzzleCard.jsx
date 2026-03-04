import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Film } from 'lucide-react';

const MoviePuzzleCard = ({ movie, onCorrect }) => {
  const [errorText, setErrorText] = useState("");
  const [clickedOption, setClickedOption] = useState(null);

  const handleOptionClick = (option) => {
    setClickedOption(option);
    if (option === movie.word) {
      setErrorText("");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B8A', '#FFD166', '#7ED7C1']
      });
      // Delay moving to the next question slightly to enjoy the confetti
      setTimeout(() => {
        onCorrect(option);
        setClickedOption(null);
      }, 1500);
    } else {
      setErrorText("Arre nahi! Try again 😄");
      setTimeout(() => setErrorText(""), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="bg-romantic-dark/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-10 w-full max-w-md mx-auto relative overflow-hidden text-center border border-white/10"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-romantic-pink/10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-romantic-gold/10 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        {/* Movie "Poster" */}
        <div className="w-48 h-72 mx-auto bg-gray-200 rounded-2xl mb-6 flex flex-col items-center justify-center shadow-lg relative overflow-hidden group border-4 border-white">
          {movie.imageUrl ? (
            <>
              <img 
                src={movie.imageUrl} 
                alt={`${movie.title} poster`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-3xl font-heading text-white px-4 text-shadow-md text-center">{movie.title}</h2>
              </div>
            </>
          ) : (
            <>
              <Film className="w-16 h-16 text-gray-400 mb-2" />
              <h2 className="text-3xl font-heading text-gray-600 px-4 text-shadow-sm text-center">{movie.title}</h2>
            </>
          )}
        </div>

        <p className="text-gray-300 mb-6 text-lg font-medium">Which word belongs in the final question?</p>

        <div className="grid grid-cols-2 gap-4">
          {movie.options.map((option, idx) => {
            const isWrong = errorText && clickedOption === option;
            const isCorrect = clickedOption === movie.word && option === movie.word;

            return (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOptionClick(option)}
                className={`py-3 px-4 rounded-xl font-medium text-lg transition-all shadow-sm border 
                  ${isCorrect ? 'bg-green-400 text-white border-green-500' : ''}
                  ${isWrong ? 'bg-red-400 text-white border-red-500 animate-shake' : ''}
                  ${!isCorrect && !isWrong ? 'bg-white/10 hover:bg-white/20 text-gray-200 border-white/10 hover:border-romantic-pink/50 hover:text-romantic-pink shadow-[0_4px_10px_rgba(0,0,0,0.3)]' : ''}
                `}
              >
                {option}
              </motion.button>
            )
          })}
        </div>

        <div className="h-8 mt-4">
          {errorText && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 font-medium"
            >
              {errorText}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MoviePuzzleCard;
