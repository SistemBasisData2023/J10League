import * as assets from "../assets";
import styles, { layout } from "../style";
import React, { useState, useEffect } from "react";
import { player_team1, player_team2 } from "../constants";

const MatchDetails = () => {
  return (
    <section>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="font-poppins font-semibold text-white text-center justify-center ss:text-[75px] text-[65px] sm:py-8 py-6">
          <span className="text-gradient">THE</span> PLAYERS
        </h1>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
          {player_team1.map((player) => (
            <div key={player.id} className="group relative">
              <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={player.imageSrc}
                  alt={player.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="text-center justify-center mt-1 text-lg font-poppins font-semibold text-white">
                {player.name}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
          {player_team2.map((player) => (
            <div key={player.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={player.imageSrc}
                  alt={player.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="text-center justify-center mt-1 text-lg font-poppins font-semibold text-white">
                {player.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
};

export default MatchDetails;