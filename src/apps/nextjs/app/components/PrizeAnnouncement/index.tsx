import React, {useEffect, useState} from 'react';
import confetti from 'canvas-confetti';
import './PrizeAnnouncement.css'

const PrizeAnnouncement = ({hasWon, message, onAnimationComplete}) => {
    const [isVisible, setIsVisible] = useState(false);

    const triggerConfetti = () => {
        confetti({
            particleCount: 150,
            spread: 80,
            origin: {y: 0.6}, // Starting position from the top
        });
    };
    useEffect(() => {
        if (hasWon) {
            setIsVisible(true);
        }
    }, [hasWon]);

    useEffect(() => {
        if (hasWon) {
            triggerConfetti(); // Trigger confetti when the user wins
        }
    }, [hasWon]); // Runs whenever `hasWon` changes

    const handleAnimationEnd = () => {
        setIsVisible(false);
        onAnimationComplete()
    };

    return (
        <>
            {isVisible && hasWon && <div className="absolute bg-black/75 w-full h-full block z-50">
                <div className={`z-30 text-red-900 prize-display ${hasWon ? 'zoom-in' : ''}`}  onAnimationEnd={handleAnimationEnd}>
                    {hasWon && <h1>{message}</h1>}
                </div>
            </div>}
        </>
    );
};

export default PrizeAnnouncement;
