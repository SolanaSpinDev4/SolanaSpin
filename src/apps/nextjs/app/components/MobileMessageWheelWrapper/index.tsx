'use client';

import React, {useState, useEffect} from 'react';
import WheelContainer from "@/app/components/WheelContainer";
import Image from "next/image";
import {LogoTitle} from "@/app/components/LogoTitle";

export const MobileMessageWheelWrapper = () => {
    const [isPortrait, setIsPortrait] = useState(false);
    const [isMobile, setIsMobile] = useState(false); // Adjust the width as needed for mobile detection

    useEffect(() => {
        const updateMedia = () => {
            setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
            setIsMobile(window.innerWidth <= 768);
        };

        // Initial check
        updateMedia();

        // Add event listeners
        window.addEventListener('resize', updateMedia);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', updateMedia);
        };
    }, []);


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
