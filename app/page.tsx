"use client";
import WheelContainer from './components/WheelContainer';
import Balance from "@/app/components/Balance";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-between p-24 h-screen-minus-80">
      <WheelContainer/>
      <Balance/>
    </section>
  );
}
