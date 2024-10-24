import React, {useEffect, useState} from "react";
import Image from "next/image";

export const Jackpot = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevNumber => prevNumber + 25); // Update the number every minute
    }, 600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Image src="/images/jackpot3.png"
             alt="Centered Image"
             className="max-w-[300px] h-auto"
             width={1024}
             height={1024}/>
      <div className="progress-container">
        <div className="progress-bar" style={{width:`${progress}%`}}></div>
      </div>
    </div>
  )
}
