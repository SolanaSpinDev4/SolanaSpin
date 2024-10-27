import type {Metadata} from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {NextUIProvider} from '@nextui-org/react';
// import Providers from "./providers";
// import Header from './components/Header';




export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
    {/*<Providers cookie={cookie}>*/}
      <NextUIProvider>
        <div className="min-h-screen ">
          {/*<Header/>*/}
          <main>{children}</main>
        </div>
      </NextUIProvider>
    {/*</Providers>*/}
    </body>
    </html>
  );
}
