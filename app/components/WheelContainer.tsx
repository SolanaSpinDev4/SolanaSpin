import React from 'react';
import {useState, useRef, useEffect} from 'react';
import {Loading} from "@/app/components/Loading";
import {Jackpot} from "@/app/components/Jackpot";
import {getRandomNumber, showVideoPrize, videoSources, wheelPositions} from "@/lib/utils";


const WheelContainer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef([]); // Array of references for video elements
  const [videoId, setVideoId] = useState(1);
  const [balance, setBalance] = useState(10000);
  const [isLoading, setIsLoading] = useState(true);
  const [videoBlobs, setVideoBlobs] = useState([]); // Store preloaded video blob URLs
  const [firstSpin, setFirstSpin] = useState(true);

  // Preload videos into blob URLs
  useEffect((): void => {
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

    fetchVideos().then(r => r);
  }, []);
  useEffect((): void => {
    if (isPlaying && videoRefs.current[videoId - 1]) {
      // Play the new video
      videoRefs.current[videoId - 1].play();
    }
  }, [videoId, isPlaying]);

  const handlePlayVideo = (): void => {

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


  const handleVideoEnd = (): void => {
    // The video naturally stays on the last frame when ended, no action needed.
    setIsPlaying(false);

    if (videoRefs.current[videoId - 1]) {
      videoRefs.current[videoId - 1].pause();
      videoRefs.current[videoId - 1].currentTime = 0;
    }

    if (videoId > wheelPositions && videoId < wheelPositions * 2 + 1) {
      const newVideoId = videoId + wheelPositions;

      //play a result video
      setVideoId(newVideoId);
      setIsPlaying(true);

      console.log('update bet - videoId is , ', videoId);
      showVideoPrize(newVideoId, wheelPositions);
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
      <div className="font-bold text-xl z-20 relative flex flex-col">
        <span>
          {videoId} : Balance: ${balance.toFixed(2)}
        </span>
      </div>
      <Jackpot/>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        {!isPlaying && !isLoading && (
          <div className="w-[140px] h-[140px] rounded-full" onClick={handlePlayVideo}></div>
        )}
      </div>
    </div>
  );
};

export default WheelContainer;
