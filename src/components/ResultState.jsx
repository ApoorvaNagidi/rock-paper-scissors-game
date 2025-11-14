// src/components/ResultState.jsx
import React from 'react';
import './ResultState.css';

// CRITICAL: Import assets from the correct relative path
import rockAsset from '../assets/rock.png'; 
import paperAsset from '../assets/hand.png';
import scissorsAsset from '../assets/scissors.png';

const CHOICES_MAP = {
    'rock': { icon: rockAsset, color: '#007bff' }, 
    'paper': { icon: paperAsset, color: '#ff9900' }, 
    'scissors': { icon: scissorsAsset, color: '#9900ff' } 
};

const getDisplayText = (outcome) => {
    switch (outcome) {
        case 'WIN': return { text: 'YOU WIN', subtext: 'AGAINST PC' };
        case 'LOSE': return { text: 'YOU LOST', subtext: 'AGAINST PC' };
        case 'TIE': return { text: 'TIE UP', subtext: 'REPLAY' };
        default: return { text: '', subtext: '' };
    }
};

const ResultState = ({ 
    userChoice, 
    pcChoice, 
    outcome, 
    onPlayAgain, 
    onNext // Prop included for completeness, even if button is rendered globally
}) => {
    
    // Destructure text and subtext (ignoring the now-unused showNext)
    const { text, subtext } = getDisplayText(outcome);

    const isUserWinner = outcome === 'WIN';
    const isPCWinner = !isUserWinner && outcome !== 'TIE';
    
    const buttonText = outcome === 'TIE' ? 'REPLAY' : 'PLAY AGAIN';
    // Helper function to render the choice column (User or PC)
    const renderChoiceColumn = (choice, isWinner) => {
        const map = CHOICES_MAP[choice];
        
        // Apply opacity class for the losing choice
        const choiceClass = isWinner ? 'winning-choice' : (outcome === 'TIE' ? '' : 'losing-choice');
        
        // Label text depends on whether it's the user's or PC's column
        const labelText = choice === userChoice ? 'YOU PICKED' : 'PC PICKED';
        
        return (
            <div className={`result-column ${choice}-result`}>
                
                {/* POSITION FIX: Label appears above the icon wrapper */}
                <p className="picked-label">{labelText}</p> 

                <div className={`picked-choice-wrapper ${isWinner ? 'huge-winner' : ''}`}>
                    
                    {/* ANIMATION FIX: Third ripple element for the winner */}
                    {isWinner && <div className="winner-ripple-3"></div>} 

                    <div 
                        className={`choice-ring picked-choice ${choiceClass}`} 
                        style={{ borderColor: map.color }}
                    >
                        {/* ASSET FIX: Use image asset */}
                        <img 
                            src={map.icon} 
                            alt={`${choice} hand icon`} 
                            className="result-icon-asset" 
                        />
                    </div>
                </div>
            </div>
        );
    };

    // Determine PC's win state (PC wins if outcome is LOSE, and it's not a TIE)
    
    
    return (
        <div className="result-state" id="result-state">
            
            {/* User Column */}
            {renderChoiceColumn(userChoice, isUserWinner)}

            {/* -------------------- RESULT MESSAGE AREA -------------------- */}
            <div className="result-message-area">
                <h2 className="result-text">{text}</h2>
                <p className="result-subtext">{subtext}</p>
                
                <button className="play-again-btn" onClick={onPlayAgain}>
                    {buttonText} 
                </button>
                {/* REMOVED NEXT BUTTON: It is now rendered globally in App.js */}
            </div>

            {/* PC Column */}
            {renderChoiceColumn(pcChoice, isPCWinner)}
        </div>
    );
};

export default ResultState;