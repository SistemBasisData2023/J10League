import * as assets from "../assets";
import styles, { layout } from "../style";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Upcoming = ({ props, index }) => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/upcomingMatches")
            .then((response) => response.json())
            .then((data) => setMatches(data))
            .catch((error) => console.error("Error fetching data", error));
    }, []);

    const handleDelete = (match_code) => {
        axios
            .delete(`http://localhost:3001/matchInfo/${match_code}`)
            .then((response) => {
                console.log("Match deleted successfully");
                // Fetch updated data after deletion
                fetch("http://localhost:3001/upcomingMatches")
                    .then((response) => response.json())
                    .then((data) => setMatches(data))
                    .catch((error) => console.error("Error fetching data", error));
            })
            .catch((error) => {
                console.error("Error deleting match", error);
            });
    };

    return (
        <section>
            <h1 className="font-poppins font-semibold text-white text-center justify-center ss:text-[40px] text-[30px]">
                <span className="text-gradient"> Upcoming </span>
                <span> Matches </span>{" "}
            </h1>
            <div className={`overflow-x-auto mb-6 feature-card`}>
                <table className={`table ${styles.flexCenter}`}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Teams</th>
                            <th>Match Date</th>
                            <th></th>
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
                                    <td> {match.match_date} </td>
                                    <td>
                                        <button className="btn btn-ghost w-14 h-14">
                                            <img src={assets['edit']} />
                                        </button>
                                        <button className="btn btn-ghost w-14 h-14" onClick={() => handleDelete(match.match_code)}>
                                            <img src={assets['trash']} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

const Results = ({ props, index }) => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/resultsMatches")
            .then((response) => response.json())
            .then((data) => setMatches(data))
            .catch((error) => console.error("Error fetching data", error));
    }, []);

    const handleDelete = (match_code) => {
        axios
            .delete(`http://localhost:3001/matchInfo/${match_code}`)
            .then((response) => {
                console.log("Match deleted successfully");
                // Fetch updated data after deletion
                fetch("http://localhost:3001/resultMatches")
                    .then((response) => response.json())
                    .then((data) => setMatches(data))
                    .catch((error) => console.error("Error fetching data", error));
            })
            .catch((error) => {
                console.error("Error deleting match", error);
            });
    };

    return (
        <section>
            <h1 className="font-poppins font-semibold text-white text-center justify-center ss:text-[40px] text-[30px]">
                <span className="text-gradient"> Results </span>
                <span> Matches </span>{" "}
            </h1>
            <div className={`overflow-x-auto feature-card`}>
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
                        {matches.map((match, index) => {
                            return (
                                <tr key={index}>
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
                                        {match.match_winner}
                                        <br />
                                        <span className="badge badge-ghost badge-sm"> {match.team_1_code} vs {match.team_2_code} </span>
                                    </td>
                                    <td> {match.team_1_score} - {match.team_2_score} </td>
                                    <td>
                                        <button className="btn btn-ghost w-14 h-14">
                                            <img src={assets['edit']} />
                                        </button>
                                        <button className="btn btn-ghost w-14 h-14" onClick={() => handleDelete(match.match_code)}>
                                            <img src={assets['trash']} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

const DataManagement = () => (
    <section id="datamanagement" className={layout.section}>
        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-semibold ss:text-[60px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
                    <span className="text-gradient"> Admin </span> <br className="sm:block hidden" />{" "}
                    <span> Data Management </span>
                </h1>
            </div>
        </div>
        <div className={`${layout.sectionImg} flex-col`}>
            <Upcoming />
            <Results />
            <a href="/register" className={`gap-x-10 font-poppins font-semibold text-[18px] text-primary bg-blue-gradient px-6 py-3 rounded-md mt-8`}>
                Register more Admin
            </a>
        </div>
    </section>
);
export default DataManagement;
