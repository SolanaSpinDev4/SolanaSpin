import React, {useEffect, useState} from "react";
import Image from "next/image";
import {NauSea} from "@/app/fonts/fonts";
import {getRandomNumber} from "@/lib/utils";

export const Jackpot = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {

            setProgress(prevNumber => {
                if (prevNumber < 100) {
                    return prevNumber + 25
                }
                return prevNumber;
            });
            // Update the number every minute
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center">
            <Image src="/images/jackpot.png"
                   alt="Centered Image"
                   className="max-w-[300px] h-auto"
                   width={1024}
                   height={1024}/>
            <div className="progress-container flex flex-col">
                <div className="progress-bar" style={{width: `${progress}%`}}></div>
            </div>
            <div
                className={`${NauSea.className} text-amber-400 text-xl`}>${(progress / 100) * getRandomNumber(4873, 5112)}</div>
        </div>
    )
}
