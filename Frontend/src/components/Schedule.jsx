import * as assets from "../assets";
import styles, { layout } from "../style";
import React, { useState, useEffect } from "react";

const FeatureCard = ({ props, index }) => {
  const [matches, setMatches] = useState([]);

  const formatMatchDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear().toString();

    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    fetch("http://localhost:3001/upcomingMatches")
      .then((response) => response.json())
      .then((data) => setMatches(data))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  return (
    <div className={`overflow-x-auto mb-6 feature-card`}>
      <table className={`table ${styles.flexCenter}`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Teams</th>
            <th>Match Date</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => {
            return (
              <tr key={ index }>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={assets[match.tournament_code]} alt="page-icon" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold"> {match.tournament_name} </div>
                      <div className="text-sm opacity-50"> {match.scope} </div>
                    </div>
                  </div>
                </td>
                <td>
                  {match.team_1_code} vs {match.team_2_code}
                  <br />
                  <span className="badge badge-ghost badge-sm"> {match.match_stage} - BEST OF {match.round_count} </span>
                </td>
                <td> {formatMatchDate(match.match_date)} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Schedule = () => (
  <section id="schedule" className={layout.section}>
    <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="flex-1 font-poppins font-semibold ss:text-[60px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
          <span className="text-gradient"> Upcoming </span> <br className="sm:block hidden" />{" "}
          <span> Matches </span>{" "}
        </h1>
      </div>
    </div>
    <div className={`flex justify-center sm:px-16 px-6 sm:py-12 py-4`}>
        <FeatureCard/>
    </div>
  </section>
);
export default Schedule;
