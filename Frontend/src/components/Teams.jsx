import * as assets from "../assets";
import styles, { layout } from "../style";
import React, { useState, useEffect } from "react";
import { teams } from "../constants";

const Teams = () => {
    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h1 className="font-poppins font-semibold text-gradient text-center justify-center ss:text-[75px] text-[50px] sm:py-10">
                TEAMS
            </h1>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {teams.map((team) => (
                    <a key={teams.id} href={team.href} className="group">
                        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
                            <img
                                src={team.imageSrc}
                                alt={team.imageAlt}
                                className="w-[100%] h-[100%] relative z-[5]"
                            />
                            {/* gradient start */}
                            <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
                            <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
                            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
                            {/* gradient end */}
                        </div>
                        <h3 className="text-center justify-center mt-1 text-lg font-poppins font-semibold text-white">{team.name}</h3>
                        <p className=" text-center justify-center mt-1 text-sm font-poppins font-semibold text-white">{team.teamInfo}</p>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Teams;