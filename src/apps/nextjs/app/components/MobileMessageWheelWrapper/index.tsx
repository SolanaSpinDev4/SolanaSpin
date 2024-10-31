'use client';

import React, {useState, useEffect} from 'react';
import WheelContainer from "@/app/components/WheelContainer";
import Image from "next/image";
import {LogoTitle} from "@/app/components/LogoTitle";
import {Slide, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const MobileMessageWheelWrapper = () => {
    const [isPortrait, setIsPortrait] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const updateMedia = () => {
                setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
                setIsMobile(window.innerWidth <= 768);
            };

            updateMedia();

            // Set up event listeners
            const mediaQuery = window.matchMedia("(orientation: portrait)");
            mediaQuery.addEventListener("change", (e) => setIsPortrait(e.matches));
            window.addEventListener("resize", updateMedia);


            return () => {
                mediaQuery.removeEventListener("change", (e) => setIsPortrait(e.matches));
                window.removeEventListener("resize", updateMedia);
            };
        }
    }, []);
    useEffect(() => {
        setIsClient(true);

        if (isClient) {
            const hasShownToast = localStorage.getItem('toastShown');

            if (hasShownToast === 'false') {
                toast.info('🎡 This is just a demo ', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                    onOpen: () => {
                        localStorage.setItem('toastShown', 'true');
                    },
                });
            }
        }
    }, [isClient]);


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
            <>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <WheelContainer/>
            </>
        )}
    </div>)
}
