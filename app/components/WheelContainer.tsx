import React from 'react';
import {useState, useRef, useEffect} from 'react';
import {Loading} from "@/app/components/Loading";
import {Jackpot} from "@/app/components/Jackpot";
import Image from "next/image";

const videoSources = [
  "/videos/start/S_W_Separate_Wood_Start_Gift_Box.mp4",
  "/videos/start/S_W_Separate_Wood_Start_No_Win_A.mp4",
  "/videos/start/S_W_Separate_Wood_Start_No_Win_B.mp4",
  "/videos/start/S_W_Separate_Wood_Start_No_Win_C.mp4",
  "/videos/start/S_W_Separate_Wood_Start_Ticket.mp4",
  "/videos/start/S_W_Separate_Wood_Start_X1A.mp4",
  "/videos/start/S_W_Separate_Wood_Start_X1B.mp4",
  "/videos/start/S_W_Separate_Wood_Start_X1C.mp4",
  "/videos/start/S_W_Separate_Wood_Start_X1D.mp4",
  "/videos/start/S_W_Separate_Wood_Start_X2A.mp4",
  "/videos/start/S_W_Separate_Wood_Start_X2B.mp4",
  "/videos/start/S_W_Separate_Wood_Start_X2C.mp4",
  "/videos/start/S_W_Separate_Wood_Start_X5A.mp4",
  "/videos/start/S_W_Separate_Wood_Start_X5B.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_Gift_Box.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_No_Win_A.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_No_Win_B.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_No_Win_C.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_Ticket.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_X1A.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_X1B.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_X1C.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_X1D.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_X2A.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_X2B.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_X2C.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_X5A.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_X5B.mp4",
  "/videos/result/S_W_Separate_Wood_Result_Gift_Box.mp4",
  "/videos/result/S_W_Separate_Wood_Result_No_Win_A.mp4",
  "/videos/result/S_W_Separate_Wood_Result_No_Win_B.mp4",
  "/videos/result/S_W_Separate_Wood_Result_No_Win_C.mp4",
  "/videos/result/S_W_Separate_Wood_Result_Ticket.mp4",
  "/videos/result/S_W_Separate_Wood_Result_X1A.mp4",
  "/videos/result/S_W_Separate_Wood_Result_X1B.mp4",
  "/videos/result/S_W_Separate_Wood_Result_X1C.mp4",
  "/videos/result/S_W_Separate_Wood_Result_X1D.mp4",
  "/videos/result/S_W_Separate_Wood_Result_X2A.mp4",
  "/videos/result/S_W_Separate_Wood_Result_X2B.mp4",
  "/videos/result/S_W_Separate_Wood_Result_X2C.mp4",
  "/videos/result/S_W_Separate_Wood_Result_X5A.mp4",
  "/videos/result/S_W_Separate_Wood_Result_X5B.mp4"
];
const wheelPositions = 14;

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const WheelContainer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef([]); // Array of references for video elements
  const [videoId, setVideoId] = useState(1);
  const [balance, setBalance] = useState(10000);
  const [isLoading, setIsLoading] = useState(true);
  const [videoBlobs, setVideoBlobs] = useState([]); // Store preloaded video blob URLs
  const [firstSpin, setFirstSpin] = useState(true);

  // Preload videos into blob URLs
  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      const blobs = await Promise.all(
        videoSources.map(async (src) => {
          const response = await fetch(src);
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        })
      );
      setVideoBlobs(blobs);
      setIsLoading(false);
    };

    fetchVideos();
  }, []);
  useEffect(() => {
    if (isPlaying && videoRefs.current[videoId - 1]) {
      // Play the new video
      videoRefs.current[videoId - 1].play();
    }
  }, [videoId, isPlaying]);

  const handlePlayVideo = () => {

    //todo remove the balance
    setBalance(balance + 1);
    if (firstSpin) {
      setVideoId(1);
      setIsPlaying(true);

      return;
    }
    // we reach here only when a video from result category has been played - videoId > 2 * wheelPositions
    setVideoId(videoId - 2 * wheelPositions);
    setIsPlaying(true);
  };


  const handleVideoEnd = () => {
    // The video naturally stays on the last frame when ended, no action needed.
    setIsPlaying(false);

    if (videoRefs.current[videoId - 1]) {
      videoRefs.current[videoId - 1].pause();
      videoRefs.current[videoId - 1].currentTime = 0;
    }

    if (videoId > wheelPositions && videoId < wheelPositions * 2 + 1) {

      //play a result video
      setVideoId(videoId + wheelPositions);
      setIsPlaying(true);
    } else if (videoId < wheelPositions + 1) {
      if (firstSpin) {
        setFirstSpin(false);
      }

      //play a stop video
      setVideoId(getRandomNumber(wheelPositions + 1, wheelPositions * 2));
      setIsPlaying(true);
    }
  };

  return (
    <div className="md:absolute top-0 left-0 w-full md:h-full overflow-hidden -z-1 video-container">
      {isLoading ? (
        <div className="absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4">
          <Loading/>
        </div>
      ) : (
        videoBlobs.length > 0 &&
        videoBlobs.map((videoBlob, index) => (
          <video
            key={index}
            ref={(el) => (videoRefs.current[index] = el)}
            onEnded={handleVideoEnd}
            loop={false}
            controls={false}
            muted={false}
            playsInline
            className={`md:absolute w-full h-full object-cover ${
              videoId === index + 1 ? "block" : "hidden"
            }`}
            src={videoBlob} // Use preloaded blob URL as video source
          />
        ))
      )}
      <div className="font-bold text-xl z-20 absolute top-0 left-0 flex flex-col">
        <span>
          {videoId} : Balance: ${balance.toFixed(2)}
        </span>
      </div>
      <Jackpot/>
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
