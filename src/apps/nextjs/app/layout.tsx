import type {Metadata} from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {NextUIProvider} from '@nextui-org/react';


// import Header from './components/Header';
const title = "Solana Spin & Win: Crypto Betting Wheel for Big Rewards";
const description =  "Experience the thrill of spinning and winning with our crypto betting app! Spin the wheel," +
        " place your bets, and enjoy a chance to win crypto rewards. Safe, secure, and full of excitement—join now " +
        "and see where the wheel takes you!\"";

export const metadata: Metadata = {
    title: title,
    description:description,
    openGraph: {
        title: title,
        description: description,
        url: "https://game.solanaspin.io/",
        images: [
            {
                url: "https://game.solanaspin.io/images/twitter-card.png",
                width: 1200,
                height: 630,
                alt: "Description of the image",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: ["https://game.solanaspin.io/images/twitter-card.png"],
    },
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
