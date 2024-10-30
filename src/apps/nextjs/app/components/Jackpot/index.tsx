import React, {useEffect, useState} from "react";
import Image from "next/image";
import {NauSea} from "@/app/fonts/fonts";
import {getRandomNumber, jackpotLimit} from "@/lib/utils";
import './Jackpot.css'

export const Jackpot = ({jackpotReached}) => {
    const [progress, setProgress] = useState(0);
    const [jackpotValue, setJackpotValue] = useState(getRandomNumber(jackpotLimit - 73, jackpotLimit + 45));

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prevNumber => {
                if (prevNumber < 100) {
                    if (prevNumber === 75) {
                        setJackpotValue(getRandomNumber(jackpotLimit - 73, jackpotLimit + 45))
                    }
                    return prevNumber + 25
                }
                return prevNumber;
            });

        }, 60000);
        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        if (progress === 100) {
            jackpotReached(jackpotValue);
            //todo fix the unfilled progress bar issue
            setProgress(0);
        }
    }, [progress, jackpotValue, jackpotReached]);

    return (
        <div className="flex flex-col items-center">
            <Image src="/images/jackpot.png"
                   alt="Centered Image"
                   loading="lazy"
                   className="max-w-[130px] lg:max-w-[300px] h-auto"
                   width={1024}
                   height={1024}/>
            <div
                className="progress-container flex flex-col w-[130px] lg:w-[200px] h-[12px] lg:h-[18px] bg-gray-300 rounded relative overflow-hidden">
                <div className="progress-bar" style={{width: `${progress}%`}}></div>
            </div>
            <div
                className={`${NauSea.className} text-amber-400 text-lg lg:text-xl`}>${(progress / 100) * jackpotValue}</div>
        </div>
    )
}
