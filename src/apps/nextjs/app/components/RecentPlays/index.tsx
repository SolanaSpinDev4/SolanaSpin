import React from "react";
import TimeAgo from "@/app/components/TimeAgo";
import clsx from "clsx";
import {NauSea} from '@/app/fonts/fonts';

interface RecentPlaysProps {
    plays: Play[];
    ticket: number;
}

const RecentPlays: React.FC<RecentPlaysProps> = ({plays, ticket}) => {
    return (
        <div className="flex flex-col items-center justify-center z-20">
            <div className="flex items-center justify-between min-w-[250px] lg:min-w-[450px] mb-5 text-sm lg:text-xl">
                <div className={`${NauSea.className}`}>Recent Plays</div>
                <div className={`${NauSea.className}`}><span className="text-xl">🎟️</span> Tickets {ticket}
                </div>
            </div>
            {plays.length > 0 && (
                <div className="max-h-[250px] lg:max-h-[285px] overflow-y-auto plays-container">
                    {plays.map((play: Play, i: number) => (
                        <div
                            className="p-1 lg:p-4 bg-black bg-opacity-25 text-white flex justify-between min-w-[250px] lg:min-w-[450px] border-b-1 border-solid border-zinc-500 last:border-b-0"
                            key={i}>
                            <div className="flex items-center justify-center text-xs lg:text-base">
                                <div><span className="capitalize">{play.name}</span> <span className="hidden lg:inline">spun a</span></div>
                                <div className={clsx("capitalize px-1 ", {
                                    "text-pink-500": play.outcome === "X1",
                                    "text-green-500": play.outcome === "X2",
                                    "text-sky-500": play.outcome === "X5",
                                    "text-orange-500": play.outcome === "gift",
                                    "text-amber-500": play.outcome === "ticket",
                                    "text-zinc-500": play.outcome === "no win"
                                })}>{play.outcome} </div>
                                {play.prize > 0 && <>
                                    <div><span className="hidden lg:inline">and</span> won</div>
                                    <div className={clsx(["px-1"], {
                                        [NauSea.className]: true,
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
            )}
        </div>
    )
}
export default RecentPlays;
