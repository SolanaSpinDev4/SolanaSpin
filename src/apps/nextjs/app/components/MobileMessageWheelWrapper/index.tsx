'use client';

import React, {useState, useEffect} from 'react';
import WheelContainer from "@/app/components/WheelContainer";
import Image from "next/image";
import {LogoTitle} from "@/app/components/LogoTitle";

export const MobileMessageWheelWrapper = () => {
    const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Adjust the width as needed for mobile detection


    useEffect(() => {
        if (typeof window !== "undefined") {
            const mediaQuery = window.matchMedia("(orientation: portrait)");

            const handleOrientationChange = (e) => {
                setIsPortrait(e.matches);
            };

            const handleResize = () => {
                setIsMobile(window.innerWidth <= 768);
            };

            mediaQuery.addEventListener("change", handleOrientationChange);
            window.addEventListener("resize", handleResize);

            return () => {
                mediaQuery.removeEventListener("change", handleOrientationChange);
                window.removeEventListener("resize", handleResize);
            };
        }
    }, []);

    return (<div>
        {isPortrait && isMobile ? (
            <div className="relative flex items-center justify-center min-h-screen h-screen w-screen min-w-screen">
                <LogoTitle/>
                <div
                    className="absolute top-0 left-0 bottom-0 right-0 w-screen h-screen bg-gray-800 bg-opacity-55 z-10"></div>
                <Image
                    src="/images/orientation-x.png"
                    alt="Centered Image"
                    className="absolute w-auto h-auto z-20"
                    width={400}
                    height={600}
                />
            </div>
        ) : (
            <WheelContainer/>
        )}
    </div>)
}
