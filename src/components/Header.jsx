// src/components/Header.jsx
import React from 'react';
import './Header.css';

const Header = ({ scores }) => {
  return (
    // New wrapper div to contain the entire header content and apply the green border
    <div className="header-border-wrapper"> 
        <header className="game-header">
           <h1 className="game-title">
                ROCK<br />
                PAPER<br />
                SCISSORS
            </h1>
            <div className="score-board">
                <div className="score-card computer-score-card">
                    <p className="score-label">COMPUTER SCORE</p>
                    <p className="score-value" id="computer-score">{scores.pcScore}</p>
                </div>
                <div className="score-card your-score-card">
                    <p className="score-label">YOUR SCORE</p>
                    <p className="score-value" id="your-score">{scores.userScore}</p>
                </div>
            </div>
        </header>
    </div>
  );
};

export default Header;