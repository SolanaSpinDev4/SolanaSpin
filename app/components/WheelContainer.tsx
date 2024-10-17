import React from 'react';
import {useState, useRef, useEffect} from 'react';

/**
 * Generates a random integer between 1 and 4, inclusive.
 *
 * @return {number} A random integer between 1 and 4.
 */

const WheelContainer: React.FC = ({children}: any) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null); // Reference to the video element
  const [video, setVideo] = useState(1);

  const handlePlayVideo = () => {
    // Set the new video number, but do NOT play the video immediately
    setVideo(Math.floor(Math.random() * 4) + 1);
    setIsPlaying(true);
  };


  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.load()
      videoRef.current.play();
    }
  }, [video]);

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="md:absolute top-0 left-0 w-full md:h-full overflow-hidden -z-1 video-container">
      <video
        ref={videoRef}
        onEnded={handleVideoEnd}
        loop={false}
        controls={false}
        muted
        playsInline
        className="md:absolute w-full h-full object-cover"
      >
        <source src={`videos/S_W_Situation_Videos_Wood_Wheel_14_Spaces-${video}.mp4`} type="video/mp4"/>
        {children}
      </video>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        {!isPlaying && (
          <img
            src="/images/blue/button.png"
            alt="Centered Image"
            onClick={handlePlayVideo}
            className="w-[200px] h-auto"
          />
        )}
      </div>
    </div>
  );
};

export default WheelContainer;
