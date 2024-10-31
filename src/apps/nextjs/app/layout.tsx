import type {Metadata} from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {NextUIProvider} from '@nextui-org/react';


// import Header from './components/Header';


export const metadata: Metadata = {
    title: "Solana Spin & Win: Crypto Betting Wheel for Big Rewards",
    description: "Experience the thrill of spinning and winning with our crypto betting app! Spin the wheel," +
        " place your bets, and enjoy a chance to win crypto rewards. Safe, secure, and full of excitement—join now " +
        "and see where the wheel takes you!\"",
};

// import {headers} from "next/headers";
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    // const cookie = headers().get("cookie");
    return (
        <html lang="en">
        <body
            className="antialiased"
        >

        <NextUIProvider>
            <div className="min-h-screen ">
                {/*<Header/>*/}
                <main>{children}</main>
            </div>
        </NextUIProvider>

        </body>
        </html>
    );
}
