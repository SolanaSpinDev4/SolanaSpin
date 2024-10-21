"use client";
import WheelContainer from './components/WheelContainer';
// import Balance from "@/app/components/Balance";
import React, from 'react';

export default function Home() {
  // const [currentVideoId, setCurrentVideoId] = useState<number | null>(null); // State to store the current video ID
  //
  // const handleVideoEnd = (videoId: number) => {
  //   console.log(`Video ${videoId} has finished playing.`);
  //   setCurrentVideoId(videoId); // Update the state with the finished video ID
  // };

  return (
    <section className="flex flex-col items-center justify-between p-24 h-screen">
      <WheelContainer/>
      {/*<Balance key={currentVideoId} videoId={currentVideoId}/>*/}
    </section>
  );
}
