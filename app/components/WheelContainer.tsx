import React from 'react';
import {useState, useRef, useEffect} from 'react';
import {Loading} from "@/app/components/Loading";
import Image from "next/image";


const videoSources = [
  'videos/S_W_Situation_Videos_Wood_Wheel_14_Spaces-1.mp4',
  'videos/S_W_Situation_Videos_Wood_Wheel_14_Spaces-2.mp4',
  'videos/S_W_Situation_Videos_Wood_Wheel_14_Spaces-3.mp4',
  'videos/S_W_Situation_Videos_Wood_Wheel_14_Spaces-4.mp4',
];

const WheelContainer: React.FC = ({}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null); // Reference to the video element
  const [videoId, setVideoId] = useState(1);
  const [balance, setBalance] = useState(10000);
  const [ticket, setTicket] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [videoBlobs, setVideoBlobs] = useState([]); // Store video blob URLs

  const handlePlayVideo = () => {
    // Set the new video number, but do NOT play the video immediately
    setVideoId(Math.floor(Math.random() * 4) + 1);
    setIsPlaying(true);
  };


  // Preload videos into blobs
  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      const blobs = await Promise.all(
        videoSources.map(async (src) => {
          const response = await fetch(src);
          const blob = await response.blob();
          return URL.createObjectURL(blob); // Convert to blob URL
        })
      );
      setVideoBlobs(blobs);// Store blob URLs in state
      setIsLoading(false);
    };

    fetchVideos().then(r => r);
  }, []);

  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.play();
    }
  }, [videoId, isPlaying]);
  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (videoId === 1) {
      setBalance(balance); // Flat balance
    } else if (videoId === 2) {
      setBalance(balance * 2); // Double balance
    } else if (videoId === 3) {
      setTicket(ticket + 1); // Add a ticket
    } else if (videoId === 4) {
      setBalance(0); // Lose balance
    }
  };

  return (
    <div className="md:absolute top-0 left-0 w-full md:h-full overflow-hidden -z-1 video-container">
      {isLoading ? <div className="absolute top-1/2 left-1/2 -translate-y-2/4	-translate-x-2/4"><Loading/>
      </div> : videoBlobs.length > 0 && (
        <video
          ref={videoRef}
          onEnded={handleVideoEnd}
          loop={false}
          controls={false}
          muted={true}
          playsInline
          className="md:absolute w-full h-full object-cover"
        >
          <source src={videoBlobs[videoId - 1]} type="video/mp4"/>
        </video>
      )}
      <div className="font-bold text-xl z-20 absolute top-0 left-0 flex flex-col">
        <span>Balance: ${balance.toFixed(2)}</span>
        <span>Tickets: {ticket}</span>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        {!isPlaying && !isLoading && (
          <Image
            src="/images/blue/button.png"
            alt="Centered Image"
            onClick={handlePlayVideo}
            className="w-[200px] h-auto"
            width={200}
            height={200}
          />
        )}
      </div>
    </div>
  );
};

export default WheelContainer;
