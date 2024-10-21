import React from 'react';
import {useState, useRef, useEffect} from 'react';

const WheelContainer: React.FC = ({}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null); // Reference to the video element
  const [videoId, setVideoId] = useState(1);
  const [balance, setBalance] = useState(10000);
  const [ticket, setTicket] = useState(0);

  const handlePlayVideo = () => {
    // Set the new video number, but do NOT play the video immediately
    setVideoId(Math.floor(Math.random() * 4) + 1);
    setIsPlaying(true);
  };


  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Load the new video source
      if (isPlaying) {
        videoRef.current.play(); // Play the video if isPlaying is true
      }
    }
  }, [videoId, isPlaying]);

  const handleVideoEnd = () => {
    setIsPlaying(false);
    console.log('videoId in WheelContainer is ->', videoId);
    // onVideoEnd(videoId)
    if (videoId === 1) {
      console.log('balance is flat');
      setBalance(balance);
    } else if (videoId === 2) {
      const bl = balance * 2
      console.log('balance is doubled');
      setBalance(bl);
      console.log(balance);
    } else if (videoId === 3) {
      console.log('ticket is added');
      const tk = ticket + 1;
      setTicket(tk);
    } else if (videoId === 4) {
      console.log('balance is lost');
      const bl = 0
      console.log(balance);
      setBalance(bl);
    } else {
      console.log(balance);
      setBalance(balance)
      console.log(balance);
    }
  };

  return (
    <div className="md:absolute top-0 left-0 w-full md:h-full overflow-hidden -z-1 video-container">
      <video
        ref={videoRef}
        onEnded={handleVideoEnd}
        loop={false}
        controls={false}
        muted={true}
        playsInline
        className="md:absolute w-full h-full object-cover"
      >
        {videoId === 1 && <source src={`videos/S_W_Situation_Videos_Wood_Wheel_14_Spaces-1.mp4`} type="video/mp4"/>}
        {videoId === 2 && <source src={`videos/S_W_Situation_Videos_Wood_Wheel_14_Spaces-2.mp4`} type="video/mp4"/>}
        {videoId === 3 && <source src={`videos/S_W_Situation_Videos_Wood_Wheel_14_Spaces-3.mp4`} type="video/mp4"/>}
        {videoId === 4 && <source src={`videos/S_W_Situation_Videos_Wood_Wheel_14_Spaces-4.mp4`} type="video/mp4"/>}
      </video>
      <div className="font-bold text-xl z-20 absolute top-0 left-0 flex flex-col">
        <span>Balance: ${balance.toFixed(2)}</span>
        <span>Tickets: {ticket}</span>
      </div>
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
