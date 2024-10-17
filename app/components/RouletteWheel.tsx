import React, {useState} from "react";
import styles from './RouletteWheel.module.css';

interface RouletteWheelProps {
  color: string;
  key: string; // Add a key prop to trigger reset
}

/**
 * Dynamically decides URLs for images based on color
 */
const getImageUrls = (color: string) => {
  const basePath = `/images/${color}`;
  return {
    bg: `${basePath}/bg.png`,
    wheel: `${basePath}/wheel.png`,
    indicator: `${basePath}/indicator.png`,
    button: `${basePath}/button.png`,
  };
};

const RouletteWheel: React.FC<RouletteWheelProps> = ({color}) => {
  const [rotation, setRotation] = useState(0);
  const imageUrls = getImageUrls(color);

  const handleSpin = () => {
    const randomRotations = Math.floor(Math.random() * 200) + 500;
    console.log('has been rotated = ', randomRotations);
    // setRotation(randomRotations);
    setRotation(360);
  };

  return (
    <div className={styles.rouletteContainer}>
      <img id="bg" src={imageUrls.bg} className={styles.bg} alt="Background"/>
      <img
        id="roulette-wheel"
        src={imageUrls.wheel}
        className={styles.wheel}
        alt="Roulette Wheel"
        style={{transform: `translate(-50%, -50%) rotate(${rotation}deg)`}}
      />
      <img id="indicator" src={imageUrls.indicator} className={styles.indicator} alt="Indicator"/>
      <button id="spin-button" className={styles.spinButton} onClick={handleSpin}>
        <img src={imageUrls.button} alt="Spin Button"/>
      </button>
    </div>
  );
};

export default RouletteWheel;
