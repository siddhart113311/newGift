import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import MoviePuzzleCard from './components/MoviePuzzleCard';
import WordCollector from './components/WordCollector';
import ProgressBar from './components/ProgressBar';
import MagicFinalScene from './components/MagicFinalScene';
import FloatingHearts from './components/FloatingHearts';
import FloatingSparkles from './components/FloatingSparkles';

const PUZZLE_DATA = [
  { word: "Kya", title: "Kya Kehna", options: ["Kya", "Kehna", "Preity", "Rahul"], imageUrl: "/assets/posters/kya-kehna.jpg" },
  { word: "Aap", title: "Aap Ki Khatir", options: ["Khatir", "Zindagi", "Aap", "Pyar"], imageUrl: "/assets/posters/aap-ki-khatir.jpg" },
  { word: "Mere", title: "Mere Brother Ki Dulhan", options: ["Dulhan", "Mere", "Brother", "Shaadi"], imageUrl: "/assets/posters/mere-brother-ki-dulhan.jpg" },
  { word: "Saath", title: "Saathiya", options: ["Saath", "Saathiya", "Sath", "Dil"], imageUrl: "/assets/posters/saathiya.jpg" },
  { word: "Date", title: "36 China Town", options: ["China", "Town", "36", "Date"], imageUrl: "/assets/posters/36-china-town.jpg" },
  { word: "Par", title: "Parineeta", options: ["Parineeta", "Pari", "Par", "Dada"], imageUrl: "/assets/posters/parineeta.jpg" },
  { word: "Jaana", title: "Jaana Pehchana", options: ["Jaana", "Pehchana", "Jana", "Ajnabee"], imageUrl: "/assets/posters/jaana-pehchana.jpg" },
  { word: "Pasand", title: "Dil Chahta Hai", options: ["Dil", "Chahta", "Hai", "Pasand"], imageUrl: "/assets/posters/dil-chahta-hai.jpg" },
  { word: "Karogi", title: "Mujhse Dosti Karoge", options: ["Mujhse", "Dosti", "Karoge", "Karogi"], imageUrl: "/assets/posters/mujhse-dosti-karoge.jpg" }
];

const TARGET_SENTENCE = ["Kya", "Aap", "Mere", "Saath", "Date", "Par", "Jaana", "Pasand", "Karogi"];

// Helper to shuffle array
const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

function App() {
  const [gameState, setGameState] = useState('landing'); // 'landing', 'playing', 'finale'
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [collectedMap, setCollectedMap] = useState({}); // { 0: 'Kya', 2: 'Mere' }

  useEffect(() => {
    // Initialize random question order
    const shuffled = shuffleArray(PUZZLE_DATA);
    setQuestions(shuffled);
  }, []);

  const startGame = () => {
    setGameState('playing');
  };

  const handleCorrectWord = (word) => {
    // Find the original index of the word in TARGET_SENTENCE
    const originalIndex = TARGET_SENTENCE.indexOf(word);
    
    setCollectedMap(prev => ({
      ...prev,
      [originalIndex]: word
    }));

    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // Small delay before finale
      setTimeout(() => setGameState('finale'), 1500);
    }
  };

  // Convert collected map to array for the WordCollector
  const collectedWordsArray = TARGET_SENTENCE.map((_, i) => collectedMap[i] || null);
  const cluesFound = Object.keys(collectedMap).length;

  return (
    <div className="font-body text-gray-800 bg-animated-gradient min-h-screen relative overflow-x-hidden">
      
      {/* Magical Sparkles Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-50 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
      <FloatingSparkles count={30} />
      <FloatingHearts count={20} />

      {gameState === 'landing' && <LandingPage onStart={startGame} />}

      {gameState === 'playing' && (
        <div className="min-h-screen flex flex-col pt-20 pb-10 px-4">
          <WordCollector 
            collectedWords={collectedWordsArray} 
            totalWords={TARGET_SENTENCE.length} 
          />
          
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto z-10">
            <ProgressBar current={cluesFound} total={TARGET_SENTENCE.length} />
            
            {questions[currentQIndex] && (
              <MoviePuzzleCard 
                key={questions[currentQIndex].title} // Force remount on new question for animations
                movie={questions[currentQIndex]}
                onCorrect={handleCorrectWord}
              />
            )}
          </div>
        </div>
      )}

      {gameState === 'finale' && (
        <MagicFinalScene words={TARGET_SENTENCE} />
      )}
    </div>
  );
}

export default App;
