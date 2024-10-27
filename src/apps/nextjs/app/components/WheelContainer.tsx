import React from 'react';
import {useState, useRef, useEffect} from 'react';
import {Loading} from "@/app/components/Loading";
import {Jackpot} from "@/app/components/Jackpot";
import {
  formatCurrency,
  getRandomNumber,
  predefinedBets,
  computePrize,
  videoSources,
  wheelPositions
} from "@/lib/utils";
import clsx from "clsx";
import RecentPlays from "@/app/components/RecentPlays";
import {LogoTitle} from "@/app/components/LogoTitle";
import {Socials} from "@/app/components/Socials";

const WheelContainer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]); // Array of references for video elements
  const [videoId, setVideoId] = useState(1);
  const [balance, setBalance] = useState(10000);
  const [ticket, setTicket] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [videoBlobs, setVideoBlobs] = useState<string[]>([]); // Store preloaded video blob URLs
  const [firstSpin, setFirstSpin] = useState(true);
  const [activeBet, setActiveBet] = useState(0);
  const [recentPlays, setRecentPlays] = useState<Play[]>([]);

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
      videoRefs.current[videoId - 1]?.play();
    }
  }, [videoId, isPlaying]);

  const handlePlayVideo = (): void => {
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
      videoRefs.current[videoId - 1]?.pause();
        if (videoRefs.current[videoId - 1]) {
            videoRefs.current[videoId - 1]!.currentTime = 0;
        }
    }

    if (videoId > wheelPositions && videoId < wheelPositions * 2 + 1) {
      const newVideoId = videoId + wheelPositions;

      //play a result video
      setVideoId(newVideoId);
      setIsPlaying(true);

      const {prize, outcome} = computePrize(newVideoId, wheelPositions, activeBet);
      const lastPlay = {name: "Anonymous", time: new Date(), outcome, prize};

      setRecentPlays([...recentPlays, lastPlay]);

      if (prize === 1) {
        setTicket(ticket + prize);
      } else {
        setBalance(balance + prize);
      }
    } else if (videoId < wheelPositions + 1) {
      if (firstSpin) {
        setFirstSpin(false);
      }

      //play a stop video
      setVideoId(getRandomNumber(wheelPositions + 1, wheelPositions * 2));
      setIsPlaying(true);
    }
  };

  function selectBet(bet: number): void {
    if (!isPlaying) {
      setActiveBet(bet);
    }
  }

  return (
    <div className="md:absolute top-0 left-0 w-full md:h-full overflow-hidden -z-1 video-container">
      {isLoading ? (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
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
      {!isPlaying && !isLoading && activeBet > 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
          <div role="button" className="w-[140px] h-[140px] rounded-full" onClick={handlePlayVideo}></div>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4 h-screen z-20">
        <div className="relative flex flex-col items-center justify-center z-20">
          <LogoTitle/>
          <Jackpot/>
        </div>
        <div className="flex flex-col items-center justify-end z-20">
          <div className="flex flex-col pb-1 lg:pb-5">
            <div className="flex items-center">
              <div className="flex flex-row justify-center items-center">
                {predefinedBets.map((bet: number, i: number) => (
                  <div
                    className={clsx(
                      "p-2 m-2 text-base lg:text-xl rounded-xl w-11 lg:w-16 h-11 lg:h-16 font-bold flex items-center justify-center bg-[url('/images/woody-button2.webp')] bg-cover bg-no-repeat",
                      isPlaying ? "" : "animate-glow cursor-pointer",
                      activeBet === bet ? "text-white/100 border-white border-1 border-solid" : "text-white/50"
                    )}
                    key={i}
                    onClick={() => selectBet(bet)}>${bet}</div>
                ))}
                <div
                  className="font-bold text-lg lg:text-2xl text-yellow-300 ml-3 border-1 border-solid border-yellow-500 p-1.5 lg:p-2 rounded"> {formatCurrency(balance)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center z-20">
          <div className="absolute top-[40px] lg:top-[80px] right-[40px] lg:right-[80px]">
            <Socials/>
          </div>
          <RecentPlays plays={recentPlays} ticket={ticket}/>
        </div>
      </div>
    </div>
  );
};

export default WheelContainer;
