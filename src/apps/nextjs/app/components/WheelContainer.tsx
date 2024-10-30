import React from 'react';
import {useState, useRef, useEffect} from 'react';
import {Loading} from "@/app/components/Loading";
import {Jackpot} from "@/app/components/Jackpot";
import {
    formatCurrency,
    getRandomNumber,
    predefinedBets,
    computePrize,
    videoSourcesHighRes,
    videoSourcesLowRes,
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
    const [videoBlobs, setVideoBlobs] = useState<string[]>(Array(videoSourcesLowRes.length).fill(null)); // Store preloaded video blob URLs
    const [firstSpin, setFirstSpin] = useState(true);
    const [activeBet, setActiveBet] = useState(0);
    const [recentPlays, setRecentPlays] = useState<Play[]>([]);
    const [isSafariMobile, setIsSafariMobile] = useState(false);

    useEffect(() => {
        // Check if the user is using Safari on a mobile device
        const ua = navigator.userAgent;
        const isSafariBrowser = ua.includes("Safari") && !ua.includes("Chrome");
        const isMobileDevice = /iPhone|iPad|iPod/.test(ua);

        setIsSafariMobile(isSafariBrowser && isMobileDevice);
    }, []);
    useEffect(() => {
        const loadLowResolutionVideos = async () => {
            // Load and display low-res videos initially
            setIsLoading(true);
            const lowResBlobs = await Promise.all(
                videoSourcesLowRes.map(async (src) => {
                    const response = await fetch(src);
                    const blob = await response.blob();
                    return URL.createObjectURL(blob);
                })
            );
            setIsLoading(false);
            setVideoBlobs(lowResBlobs);
        };

        const replaceWithHighResolutionVideos = async () => {
            const BATCH_SIZE = 2;

            for (let i = 0; i < videoSourcesHighRes.length; i += BATCH_SIZE) {
                const batch = videoSourcesHighRes.slice(i, i + BATCH_SIZE);

                // Fetch each video in the batch
                const batchBlobs = await Promise.all(
                    batch.map(async (src) => {
                        const response = await fetch(src);
                        const blob = await response.blob();
                        return URL.createObjectURL(blob);
                    })
                );

                // Update each video as it finishes loading
                setVideoBlobs((prevBlobs) => {
                    const updatedBlobs = [...prevBlobs];
                    for (let j = 0; j < batchBlobs.length; j++) {
                        const globalIndex = i + j;
                        if (globalIndex < updatedBlobs.length) {
                            updatedBlobs[globalIndex] = batchBlobs[j];
                        }
                    }
                    return updatedBlobs;
                });

                await new Promise((resolve) => setTimeout(resolve, 500));
            }
        };

        const startLoading = async () => {
            await loadLowResolutionVideos();

            if ("requestIdleCallback" in window) {
                requestIdleCallback(() => replaceWithHighResolutionVideos());
            } else {
                await replaceWithHighResolutionVideos();
            }

        };

        startLoading().then(r => r);
    }, [videoSourcesLowRes, videoSourcesHighRes]);

    useEffect((): void => {
        if (isPlaying && videoRefs.current[videoId - 1]) {
            // Play the new video
            videoRefs.current[videoId - 1]?.play();
        }
    }, [videoId, isPlaying]);

    useEffect(() => {
        videoRefs.current.forEach((video, idx) => {
            if (video) {
                if (idx === videoId - 1) {
                    video.play().then(r => r);
                } else {
                    video.pause();
                }
            }
        });
    }, [videoId]);

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
        <div
            className="absolute top-0 left-0 bottom-0 right-0 bg-black w-full h-full overflow-hidden -z-1 video-container">
            {isLoading ? (
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    <Loading/>
                </div>
            ) : (
                videoBlobs.length > 0 &&
                videoBlobs.map((videoBlob, index) => (
                    <video
                        key={index}
                        ref={(el) => {
                            videoRefs.current[index] = el
                        }}
                        onEnded={handleVideoEnd}
                        loop={false}
                        controls={false}
                        muted={false}
                        playsInline
                        preload="auto"
                        poster="/images/frame-0.png"
                        className={`absolute w-screen h-screen sm:w-full sm:h-full object-cover top-0 left-0 right-0 bottom-0 ${
                            videoId === index + 1 ? "block" : "hidden"
                        }`}
                        src={videoBlob}
                    />
                ))
            )}
            {!isPlaying && !isLoading && activeBet > 0 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                    <div role="button" className="w-[140px] h-[140px] rounded-full" onClick={handlePlayVideo}></div>
                </div>
            )}
            <div className="grid grid-cols-3 gap-4 min-h-screen z-20">
                <div className="relative flex flex-col items-center justify-center z-20">
                    <LogoTitle/>
                    <Jackpot/>
                </div>
                <div className="min-h-screen relative flex flex-col items-start justify-end z-20 text-white">
                    <div className=" flex lg:pb-5" style={isSafariMobile ? {paddingBottom: 90} : {}}>
                        <div className="flex items-center">
                            <div className="flex flex-row justify-center items-center">
                                {predefinedBets.map((bet: number, i: number) => (
                                    <div
                                        className={clsx(
                                            "p-2 m-2 text-sm lg:text-xl rounded-xl w-18 lg:w-16 h-8 lg:h-16 font-bold flex items-center justify-center bg-[url('/images/woody-button2.webp')] bg-cover bg-no-repeat bg-center",
                                            isPlaying ? "" : "animate-glow cursor-pointer",
                                            activeBet === bet ? "text-white/100 border-white border-1 border-solid" : "text-white/50"
                                        )}
                                        key={i}
                                        onClick={() => selectBet(bet)}>${bet}</div>
                                ))}
                                <div
                                    className="font-bold text-sm lg:text-2xl text-yellow-300 ml-3 border-1 border-solid border-yellow-500 p-1.5 lg:p-2 rounded">
                                    {formatCurrency(balance)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex flex-col items-center justify-center z-20 pr-2">
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
