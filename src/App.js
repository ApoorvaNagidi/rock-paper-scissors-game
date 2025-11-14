// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import RulesPopup from './components/RulesPopup'; // Renamed import
import ChoiceState from './components/ChoiceState';
import ResultState from './components/ResultState';
import HurrayView from './components/HurrayView';
import './App.css'; // Main layout and global styles

const CHOICES = ['rock', 'paper', 'scissors'];
const STORAGE_KEY = 'rpsScoresReact';

// Function to load scores from localStorage
const loadScores = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { userScore: 0, pcScore: 0 };
  } catch (e) {
    console.error("Error reading scores:", e);
    return { userScore: 0, pcScore: 0 };
  }
};

const getComputerChoice = () => CHOICES[Math.floor(Math.random() * CHOICES.length)];

const determineWinner = (userChoice, pcChoice) => {
  if (userChoice === pcChoice) return 'TIE';
  if (
    (userChoice === 'rock' && pcChoice === 'scissors') ||
    (userChoice === 'scissors' && pcChoice === 'paper') ||
    (userChoice === 'paper' && pcChoice === 'rock')
  ) {
    return 'WIN';
  }
  return 'LOSE';
};

function App() {
  const [scores, setScores] = useState(loadScores);
  const [view, setView] = useState('CHOICE'); // 'CHOICE', 'RESULT', 'HURRAY'
  const [roundResult, setRoundResult] = useState({ user: '', pc: '', outcome: '' });
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  // Effect to save scores whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  }, [scores]);

  const showNextButton = view === 'RESULT' && roundResult.outcome === 'WIN';

  const handleGoToHurray = useCallback(() => {
    setView('HURRAY');
  }, []);

  const handlePlayAgain = useCallback(() => {
    setView('CHOICE');
  }, []);

  const handleUserChoice = useCallback((userChoice) => {
    const pcChoice = getComputerChoice();
    const outcome = determineWinner(userChoice, pcChoice);

    setRoundResult({ user: userChoice, pc: pcChoice, outcome });

    setScores(prevScores => {
      let newScores = { ...prevScores };
      if (outcome === 'WIN') {
        newScores.userScore += 1;
      } else if (outcome === 'LOSE') {
        newScores.pcScore += 1;
        
      }
      setView('RESULT');
      return newScores;
    });
  }, []);

  const renderContent = () => {
    if (view === 'CHOICE') {
      return <ChoiceState onChoice={handleUserChoice} />;
    }
    if (view === 'RESULT') {
      return (
        <ResultState 
          userChoice={roundResult.user}
          pcChoice={roundResult.pc}
          outcome={roundResult.outcome}
          onPlayAgain={handlePlayAgain}
          onNext={handleGoToHurray}
        />
      );
    }
    if (view === 'HURRAY') {
      return (
        <HurrayView 
          onPlayAgain={handlePlayAgain}
        />
      );
    }
    return null;
  };

  const showHeader = view !== 'HURRAY';
  const rulesButtonClass = view === 'HURRAY' ? 'rules-btn rules-btn-hurray' : 'rules-btn';

  const popupClass = view === 'HURRAY' ? 'rules-modal-overlay rules-popup-hurray' : 'rules-modal-overlay';

  return (
    <main className="game-container">
      {showHeader && <Header scores={scores} />}
      
      <div id="app-content" className="game-view-wrapper">
        {renderContent()}
      </div>

      {/* RULES BUTTON: Always visible */}
     <button className={rulesButtonClass} onClick={() => setIsRulesOpen(true)}>RULES</button>
      

      {showNextButton && (
        <button className="next-btn-global" onClick={handleGoToHurray}>NEXT</button>
      )}

      {/* RULES POPUP: Rendered inside the game-container for 'position: absolute' anchoring */}
      <RulesPopup 
        isOpen={isRulesOpen} 
        onClose={() => setIsRulesOpen(false)}
        // Pass the conditional class name as a prop to RulesPopup
        className={popupClass}
      />
    </main>
  );
}

export default App;