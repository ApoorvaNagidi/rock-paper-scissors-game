// src/components/ChoiceState.jsx
import React from 'react';

// Import the specific assets
import rockImage from '../assets/rock.png';
import paperImage from '../assets/hand.png';
import scissorsImage from '../assets/scissors.png';
import './ChoiceState.css';

// Map the choice string to the imported image asset
const CHOICE_ASSETS = {
    'rock': rockImage,
    'scissors': scissorsImage,
    'paper': paperImage
};

const CHOICES = ['rock', 'scissors', 'paper']; 

const ChoiceState = ({ onChoice }) => {
  return (
    <div className="choice-state" id="choice-state">
      
      {/* Third Line (SCISSORS to PAPER) added as a dedicated element */}
      {/* Ensure this line element is still included if you implemented the line fix */}
      <div className="choice-line line-scissors-paper"></div> 
      
      {CHOICES.map(choice => (
        <div 
          key={choice}
          className={`choice-container ${choice}-container`} 
          data-choice={choice}
          onClick={() => onChoice(choice)}
        >
          <div className="choice-ring">
            {/* Swapping Emoji for Image Asset */}
            <img 
              src={CHOICE_ASSETS[choice]} 
              alt={`${choice} hand icon`} 
              className="choice-icon-asset" 
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChoiceState;