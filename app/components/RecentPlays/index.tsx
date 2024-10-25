import React from "react";
import TimeAgo from "@/app/components/TimeAgo";
import clsx from "clsx";

interface RecentPlaysProps {
  plays: Play[];
}

const RecentPlays: React.FC<RecentPlaysProps> = ({plays}) => {
  return (<div className="flex flex-col items-center justify-center z-20">
      {plays.map((play: Play, i: number) => (
        <div className="p-4 bg-cyan-950 text-white flex justify-between min-w-[450px] border-b-1 border-solid border-cyan-600 last:border-b-0" key={i}>
          <div className="flex">
            <div><span className="capitalize">{play.name}</span> spun a</div>
            <div className={clsx("capitalize px-1", {
              "text-pink-500": play.outcome === "X1",
              "text-green-500": play.outcome === "X2",
              "text-sky-500": play.outcome === "X5",
              "text-orange-500": play.outcome === "gift",
              "text-amber-500": play.outcome === "ticket",
              "text-zinc-500": play.outcome === "no win"
            })}>{play.outcome} </div>
            {play.prize > 0 && <>
              <div>and won</div>
              <div className={clsx("px-1", {
                "text-emerald-500": play.prize > 0
              })}>{play.prize === 1 ? "1 Ticket" : "$" + play.prize}</div>
            </>
            }
          </div>
          <div className="">
            <TimeAgo time={play.time}/>
          </div>
        </div>
      ))}
    </div>
  )
}
export default RecentPlays;
