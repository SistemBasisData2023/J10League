import * as assets from "../assets";
import styles, { layout } from "../style";
import React, { useState, useEffect } from "react";
import { result } from "../constants";

const Upcoming = ({ props, index }) => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/upcomingMatches")
            .then((response) => response.json())
            .then((data) => setMatches(data))
            .catch((error) => console.error("Error fetching data", error));
    }, []);

    return (
        <div className={`overflow-x-auto mb-6 feature-card`}>
            <span> Upcoming Matches </span>
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
                            <tr key={index}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={assets[match.tournament_id]} alt="page-icon" />

                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold"> {match.tournament_name} </div>
                                            <div className="text-sm opacity-50"> {match.scope} </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {match.team_code_1} vs {match.team_code_2}
                                    <br />
                                    <span className="badge badge-ghost badge-sm"> {match.stage} - {match.best_of} </span>
                                </td>
                                <td> {match.match_date} </td>
                                <td>
                                <div className="btn btn-ghost w-14 h-14">
                                <img src={assets['edit']} />
                                </div>
                                <div className="btn btn-ghost w-14 h-14">
                                <img src={assets['trash']}/>
                                </div>
                            </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const Results = ({ index }) => (
    <div className={`overflow-x-auto ${index !== result.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
        <span> Results Matches </span>
        <table className={`table ${styles.flexCenter}`}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Winner</th>
                    <th>Score</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {result.map((data, index) => {
                    return (
                        <tr key={index}>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={data.icon} alt="page-icon" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold"> {data.title} </div>
                                        <div className="text-sm opacity-50"> {data.content} </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {data.winners}
                                <br />
                                <span className="badge badge-ghost badge-sm"> {data.match_details} </span>
                            </td>
                            <td> {data.score} </td>
                            <td>
                                <div className="btn btn-ghost w-14 h-14">
                                <img src={assets['edit']} />
                                </div>
                                <div className="btn btn-ghost w-14 h-14">
                                <img src={assets['trash']}/>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
);

const DataManagement = () => (
    <section id="datamanagement" className={layout.section}>
        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-semibold ss:text-[60px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
                    <span className="text-gradient"> Admin </span> <br className="sm:block hidden" />{" "}
                    <span> Management </span>{" "}
                </h1>
            </div>
        </div>
        <div className={`${layout.sectionImg} flex-col`}>
            <Upcoming />
            <Results />
        </div>
    </section>
);
export default DataManagement;
