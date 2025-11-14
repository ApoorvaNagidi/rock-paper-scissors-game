// src/components/HurrayView.jsx (For Frame 9)
import React from 'react';
import './HurrayView.css'; 

const HurrayView = ({ onPlayAgain }) => {
    return (
        <div className="hurray-view">
            <div className="hurray-content">
                <div className="trophy-area">
                    {/* Stars and Trophy - matching Screenshot (27).png / Frame 9 */}
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                     <span className="star">★</span>
                      <span className="star">★</span>
                       <span className="star">★</span>
                    <div className="trophy-icon">🏆</div> 

                </div>

                <h2 className="hurray-text">HURRAY!!</h2>
                <p className="hurray-subtext">YOU WON THE GAME</p>
                
                <button className="play-again-btn" onClick={onPlayAgain}>PLAY AGAIN</button>
                
                {/* The design (Frame 9) also shows a RULES button, which is separate in App.js */}
            </div>
        </div>
    );
};

export default HurrayView;