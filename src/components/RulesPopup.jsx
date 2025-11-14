// src/components/RulesPopup.jsx (No changes needed)
import React from 'react';
import './RulesPopup.css';

const RulesPopup = ({ isOpen, onClose, className }) => {
  if (!isOpen) return null;

  return (
    <div className={className}> 
        <div className="rules-box">
            <header className="rules-header">
                <h2>Game Rules</h2>
                <button className="close-rules-btn" onClick={onClose}>X</button>
            </header>
            <div className="rules-content">
                <ul>
                    <li>"Rock" beats scissors, "scissors" beat paper, and "paper" beats rock.</li>
                    <li>Agree ahead of time whether you'll count off "rock, paper, scissors, shoot" or just "rock, paper, scissors."</li>
                    <li>Use rock, paper, scissors to settle minor decisions or simply play to pass the time.</li>
                    <li>If both players lay down the same hand, each player lays down another hand.</li>
                </ul>
            </div>
        </div>
    </div>
  );
};

export default RulesPopup;