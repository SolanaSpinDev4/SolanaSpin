"use client";

import Image from "next/image";
import { ConnectBtn } from "./components/connectButton";
import Profile from "./components/profile";
import Tabs from './components/Tabs';
import Balance from "@/app/components/Balance";

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Tabs />
        {/*<Profile/>*/}<Balance />
      </main>
  );
}
