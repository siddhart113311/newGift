import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import DialogueQuestionCard from './components/DialogueQuestionCard';
import MysteryBoxCollector from './components/MysteryBoxCollector';
import ProgressBar from './components/ProgressBar';
import SpinningMysteryBoxes from './components/SpinningMysteryBoxes';
import FloatingHearts from './components/FloatingHearts';
import FloatingSparkles from './components/FloatingSparkles';

// Each question's `word` is one of the 9 TARGET_SENTENCE words.
// Multiple questions map to the same word — the game picks ONE per word per session.
const DIALOGUE_DATA = [
  // --- kya ---
  { word: "kya", dialogue: "Yeh Babu Rao ka style hai… naam hai Babu Rao Ganpat Rao Apte.", correctMovie: "Hera Pheri", options: ["Hera Pheri", "Hungama", "Bhagam Bhag", "De Dana Dan"] },
  { word: "kya", dialogue: "Ek baat yaad rakhna… tu ladki ko izzat dega toh ladki tujhe apni izzat degi.", correctMovie: "Bhagam Bhag", options: ["Bhagam Bhag", "Hungama", "Hera Pheri", "Chup Chup Ke"] },
  { word: "kya", dialogue: "Tum jaise logon ki wajah se hi duniya mein confusion hota hai.", correctMovie: "Hungama", options: ["Hungama", "Bhagam Bhag", "Chup Chup Ke", "Hera Pheri"] },
  { word: "kya", dialogue: "Agar yeh plan fail ho gaya na… toh sabki band baj jayegi.", correctMovie: "Bhagam Bhag", options: ["Bhagam Bhag", "Hungama", "Hera Pheri", "De Dana Dan"] },

  // --- aap ---
  { word: "aap", dialogue: "Utha le re baba… utha le… mereko nahi re… in dono ko utha le!", correctMovie: "Hera Pheri", options: ["Hera Pheri", "Hungama", "Bhagam Bhag", "Chup Chup Ke"] },
  { word: "aap", dialogue: "Hum gareeb log hain… par imaandari se jeete hain.", correctMovie: "Malamaal Weekly", options: ["Malamaal Weekly", "Hungama", "Hera Pheri", "Khatta Meetha"] },
  { word: "aap", dialogue: "Paisa bolta hai… aur jab paisa bolta hai toh sab chup ho jaate hain.", correctMovie: "Khatta Meetha", options: ["Khatta Meetha", "Hera Pheri", "Hungama", "Bhagam Bhag"] },
  { word: "aap", dialogue: "Yeh mazaak nahi hai… yeh situation bahut dangerous ho sakti hai.", correctMovie: "Hungama", options: ["Hungama", "Bhagam Bhag", "Chup Chup Ke", "Hera Pheri"] },

  // --- mera ---
  { word: "mera", dialogue: "25 din mein paisa double… paisa double!", correctMovie: "Hera Pheri", options: ["Hera Pheri", "Bhagam Bhag", "Hungama", "Chup Chup Ke"] },
  { word: "mera", dialogue: "Sach kadwa hota hai… lekin sach hi sach hota hai.", correctMovie: "Khatta Meetha", options: ["Khatta Meetha", "Hungama", "Hera Pheri", "Bhagam Bhag"] },
  { word: "mera", dialogue: "Mere paas ek solid idea hai… agar yeh kaam kar gaya toh sab set ho jayega.", correctMovie: "Hera Pheri", options: ["Hera Pheri", "Hungama", "Bhagam Bhag", "De Dana Dan"] },
  { word: "mera", dialogue: "Yeh sab kya ho raha hai… koi mujhe samjhayega bhi?", correctMovie: "Bhagam Bhag", options: ["Bhagam Bhag", "Hungama", "Hera Pheri", "Chup Chup Ke"] },

  // --- saath ---
  { word: "saath", dialogue: "Control Uday control… nahi toh yeh situation control ke bahar ho jayegi.", correctMovie: "Bhool Bhulaiyaa", options: ["Bhool Bhulaiyaa", "Hungama", "Bhagam Bhag", "Hera Pheri"] },
  { word: "saath", dialogue: "Agar dimaag hota na… toh tum aise kaam hi nahi karte.", correctMovie: "Hungama", options: ["Hungama", "Bhagam Bhag", "Chup Chup Ke", "Hera Pheri"] },
  { word: "saath", dialogue: "Yeh sab confusion ka chakkar hai… kisi ko kuch samajh hi nahi aa raha.", correctMovie: "Hungama", options: ["Hungama", "Bhagam Bhag", "Chup Chup Ke", "Hera Pheri"] },

  // --- date ---
  { word: "date", dialogue: "Manjulika… Manjulika yahan hai… aur woh badla lene aayi hai!", correctMovie: "Bhool Bhulaiyaa", options: ["Bhool Bhulaiyaa", "Bhagam Bhag", "Hungama", "Chup Chup Ke"] },
  { word: "date", dialogue: "Shaadi ek aisi cheez hai jisme aadmi ki zindagi ulat jaati hai.", correctMovie: "Garam Masala", options: ["Garam Masala", "Hungama", "Bhagam Bhag", "Hera Pheri"] },
  { word: "date", dialogue: "Situation control ke bahar jaa rahi hai… kuch karna padega.", correctMovie: "Bhagam Bhag", options: ["Bhagam Bhag", "Hungama", "De Dana Dan", "Hera Pheri"] },

  // --- per ---
  { word: "per", dialogue: "London ka mausam aur London ki ladkiyan… inka koi bharosa nahi hota.", correctMovie: "Bhagam Bhag", options: ["Bhagam Bhag", "Hungama", "Garam Masala", "Hera Pheri"] },
  { word: "per", dialogue: "Problem yeh nahi hai ki problem kya hai… problem yeh hai ki solution kya hai.", correctMovie: "De Dana Dan", options: ["De Dana Dan", "Bhagam Bhag", "Hungama", "Hera Pheri"] },
  { word: "per", dialogue: "Yeh duniya logic se nahi chalti… kismat se chalti hai.", correctMovie: "Malamaal Weekly", options: ["Malamaal Weekly", "Hungama", "Hera Pheri", "Bhagam Bhag"] },

  // --- aana ---
  { word: "aana", dialogue: "Yeh sab paison ka chakkar hai babu bhaiya… paisa aaye toh sab theek ho jayega.", correctMovie: "Hera Pheri", options: ["Hera Pheri", "Hungama", "Bhagam Bhag", "De Dana Dan"] },
  { word: "aana", dialogue: "Insaan galtiyon se seekhta hai… par kuch log galtiyon se bhi nahi seekhte.", correctMovie: "Khatta Meetha", options: ["Khatta Meetha", "Hungama", "Bhagam Bhag", "Hera Pheri"] },
  { word: "aana", dialogue: "Jab bhi main kuch accha karne ki koshish karta hoon… kuch na kuch gadbad ho jaati hai.", correctMovie: "Chup Chup Ke", options: ["Chup Chup Ke", "Hungama", "Bhagam Bhag", "Hera Pheri"] },

  // --- pasand ---
  { word: "pasand", dialogue: "Joh hai woh nahi hai… aur joh nahi hai woh ho sakta hai.", correctMovie: "Chup Chup Ke", options: ["Chup Chup Ke", "Hungama", "Bhagam Bhag", "Hera Pheri"] },
  { word: "pasand", dialogue: "Yeh sab drama hai… asli kahani toh ab shuru hogi.", correctMovie: "Hungama", options: ["Hungama", "Bhagam Bhag", "Chup Chup Ke", "Hera Pheri"] },
  { word: "pasand", dialogue: "Sach bolne ki aadat ho toh aadmi kabhi darrta nahi.", correctMovie: "Khatta Meetha", options: ["Khatta Meetha", "Hungama", "Bhagam Bhag", "Hera Pheri"] },

  // --- karenge? ---
  { word: "karenge?", dialogue: "Hum koi mandir ka ghanta hai kya… jo koi bhi aake baja jaata hai?", correctMovie: "Hungama", options: ["Hungama", "Bhagam Bhag", "Chup Chup Ke", "Hera Pheri"] },
  { word: "karenge?", dialogue: "Plan simple hai… par execution thoda complicated hai.", correctMovie: "Bhagam Bhag", options: ["Bhagam Bhag", "Hungama", "Hera Pheri", "De Dana Dan"] },
  { word: "karenge?", dialogue: "Agar paisa ho toh duniya mein kuch bhi ho sakta hai.", correctMovie: "De Dana Dan", options: ["De Dana Dan", "Hungama", "Bhagam Bhag", "Hera Pheri"] },
];

const TARGET_SENTENCE = ["kya", "aap", "mera", "saath", "date", "per", "aana", "pasand", "karenge?"];

// Helper to shuffle array
const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

// Pick ONE random question per target word, in the sentence order
const pickOnePerWord = () => {
  return TARGET_SENTENCE.map(word => {
    const pool = DIALOGUE_DATA.filter(q => q.word === word);
    return pool[Math.floor(Math.random() * pool.length)];
  });
};

function App() {
  const [gameState, setGameState] = useState('landing'); // 'landing', 'playing', 'finale_spinning'
  const [questions] = useState(() => pickOnePerWord());
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [collectedBoxes, setCollectedBoxes] = useState([]);

  const startGame = () => {
    setGameState('playing');
  };

  const handleCorrectAnswer = (word) => {
    // Add the found word to the collected boxes array
    setCollectedBoxes(prev => [...prev, word]);

    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // Small delay before transition to spinning finale
      setTimeout(() => setGameState('finale_spinning'), 1500);
    }
  };

  return (
    <div className="font-body text-gray-800 bg-animated-gradient min-h-screen relative overflow-x-hidden">
      
      {/* Magical Sparkles Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-50 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
      <FloatingSparkles count={30} />
      <FloatingHearts count={20} />

      {gameState === 'landing' && <LandingPage onStart={startGame} />}

      {gameState === 'playing' && (
        <div className="min-h-screen flex flex-col pt-20 pb-10 px-4">
          <MysteryBoxCollector 
            collectedCount={collectedBoxes.length} 
            totalRequired={TARGET_SENTENCE.length} 
          />
          
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto z-10 pt-8">
            <ProgressBar current={collectedBoxes.length} total={TARGET_SENTENCE.length} />
            
            {questions[currentQIndex] && (
              <DialogueQuestionCard 
                key={questions[currentQIndex].dialogue} 
                questionData={questions[currentQIndex]}
                onCorrect={handleCorrectAnswer}
              />
            )}
          </div>
        </div>
      )}

      {gameState === 'finale_spinning' && (
        <SpinningMysteryBoxes 
          targetSentence={TARGET_SENTENCE}
        />
      )}
    </div>
  );
}

export default App;
