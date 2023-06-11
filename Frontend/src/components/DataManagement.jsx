import * as assets from "../assets";
import styles, { layout } from "../style";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Upcoming = ({ props, index }) => {
    const [matches, setMatches] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [team_1_code, setTeam_1_code] = useState("");
    const [team_2_code, setTeam_2_code] = useState("");
    const [match_date, setMatch_date] = useState("");

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

    //Make put request of handleUpdate function that fetches the data from "http://localhost:3001/updateUpcomingMatch" and updates the data in the database
    const handleUpdate = (match_code) => {
        axios
            .put(`http://localhost:3001/updateUpcomingMatch/${match_code}`, {
                team_1_code: team_1_code,
                team_2_code: team_2_code,
                match_date: match_date,
                // match_date: moment(match_date).format('DD-MM-YYYY'),
            })
            .then((response) => {
                console.log("Match updated successfully");
                // Fetch updated data after update
                fetch("http://localhost:3001/upcomingMatches")
                    .then((response) => response.json())
                    .then((data) => setMatches(data))
                    .catch((error) => console.error("Error fetching data", error));
            })
            .catch((error) => {
                console.error("Error updating match", error);
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
                                    <td> {formatMatchDate(match.match_date)} </td>
                                    <td>
                                        <button onClick={() => setShowModal(true)} className="btn btn-ghost w-14 h-14 z-50">
                                            <img src={assets['edit']} />
                                        </button>
                                        {showModal ? (
                                            <>
                                                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                        {/*content*/}
                                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-primary outline-none focus:outline-none">
                                                            {/*header*/}
                                                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                                <h3 className="text-3xl font-semibold">
                                                                    EDIT DATA
                                                                </h3>
                                                                <button
                                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                    onClick={() => setShowModal(false)}
                                                                >
                                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                        ×
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            {/*body*/}
                                                            <div className="relative p-6 flex-auto">
                                                                <form onSubmit={handleUpdate}>
                                                                    <div className="font-poppins font-semibold text-white text-[15px] leading-[23.4px] mb-1">
                                                                        <label htmlFor="team_1_code" className="block mb-2">Team 1</label>
                                                                        <input type="text" id="team_1_code" name="team_1_code" className="w-full px-3 py-2 border rounded-md" value={team_1_code} onChange={(event) => setTeam_1_code(event.target.value)} required />
                                                                    </div>
                                                                    <div className="font-poppins font-semibold text-white text-[15px] leading-[23.4px] mb-1">
                                                                        <label htmlFor="team_2_code" className="block mb-2">Team 2</label>
                                                                        <input type="text" id="team_2_code" name="team_2_code" className="w-full px-3 py-2 border rounded-md" value={team_2_code} onChange={(event) => setTeam_2_code(event.target.value)} required />
                                                                    </div>
                                                                    <div className="font-poppins font-semibold text-white text-[15px] leading-[23.4px] mb-1">
                                                                        <label htmlFor="match_date" className="block mb-2">Match Date</label>
                                                                        <input type="date" id="match_date" name="match_date" className="w-full px-3 py-2 border rounded-md" value={match_date} onChange={(event) => setMatch_date(event.target.value)} required />
                                                                    </div>
                                                                    <button type="submit" className="gap-x-10 font-poppins font-semibold text-[18px] text-primary bg-blue-gradient px-4 py-2 rounded-md mt-2" onClick={() => handleUpdate(match.match_code)}>Save Changes</button>
                                                                </form>
                                                            </div>
                                                            {/*footer*/}
                                                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                                <button
                                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                    type="button"
                                                                    onClick={() => setShowModal(false)}
                                                                >
                                                                    Close
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                            </>
                                        ) : null}


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
    const [showModal, setShowModal] = useState(false);
    const [match_winner, setMatch_winner] = useState("");
    const [team_1_score, setTeam_1_score] = useState("");
    const [team_2_score, setTeam_2_score] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/resultsMatches")
            .then((response) => response.json())
            .then((data) => setMatches(data))
            .catch((error) => console.error("Error fetching data", error));
    }, []);

    const handleDeleteResult = (match_code) => {
        axios
            .delete(`http://localhost:3001/matchInfo/${match_code}`)
            .then((response) => {
                console.log("Match deleted successfully");
                // Fetch updated data after deletion
                fetch("http://localhost:3001/resultsMatches")
                    .then((response) => response.json())
                    .then((data) => setMatches(data))
                    .catch((error) => console.error("Error fetching data", error));
            })
            .catch((error) => {
                console.error("Error deleting match", error);
            });
    };

    const handleUpdate = (match_code) => {
        axios
            .put(`http://localhost:3001/updateUpcomingMatch/${match_code}`, {
                team_1_code: team_1_code,
                team_2_code: team_2_code,
                match_date: match_date,
                // match_date: moment(match_date).format('DD-MM-YYYY'),
            })
            .then((response) => {
                console.log("Match updated successfully");
                // Fetch updated data after update
                fetch("http://localhost:3001/upcomingMatches")
                    .then((response) => response.json())
                    .then((data) => setMatches(data))
                    .catch((error) => console.error("Error fetching data", error));
            })
            .catch((error) => {
                console.error("Error updating match", error);
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
                                        <button onClick={() => setShowModal(true)} className="btn btn-ghost w-14 h-14 z-50">
                                            <img src={assets['edit']} />
                                        </button>
                                        {showModal ? (
                                            <>
                                                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                        {/*content*/}
                                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-primary outline-none focus:outline-none">
                                                            {/*header*/}
                                                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                                <h3 className="text-3xl font-semibold">
                                                                    EDIT DATA
                                                                </h3>
                                                                <button
                                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                    onClick={() => setShowModal(false)}
                                                                >
                                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                        ×
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            {/*body*/}
                                                            <div className="relative p-6 flex-auto">
                                                                <form onSubmit={handleUpdate}>
                                                                    <div className="font-poppins font-semibold text-white text-[15px] leading-[23.4px] mb-1">
                                                                        <label htmlFor="team_1_code" className="block mb-2">Match Winner</label>
                                                                        <input type="text" id="team_1_code" name="team_1_code" className="w-full px-3 py-2 border rounded-md" value={match_winner} onChange={(event) => setMatch_winner(event.target.value)} required />
                                                                    </div>
                                                                    <div className="font-poppins font-semibold text-white text-[15px] leading-[23.4px] mb-1">
                                                                        <label htmlFor="team_2_code" className="block mb-2">Team 1 Score</label>
                                                                        <input type="text" id="team_2_code" name="team_2_code" className="w-full px-3 py-2 border rounded-md" value={team_1_score} onChange={(event) => setTeam_1_score(event.target.value)} required />
                                                                    </div>
                                                                    <div className="font-poppins font-semibold text-white text-[15px] leading-[23.4px] mb-1">
                                                                        <label htmlFor="team_2_code" className="block mb-2">Team 2 Score</label>
                                                                        <input type="text" id="team_2_code" name="team_2_code" className="w-full px-3 py-2 border rounded-md" value={team_2_score} onChange={(event) => setTeam_2_score(event.target.value)} required />
                                                                    </div>
                                                                    <button type="submit" className="gap-x-10 font-poppins font-semibold text-[18px] text-primary bg-blue-gradient px-4 py-2 rounded-md mt-2" onClick={() => handleUpdate(match.match_code)}>Save Changes</button>
                                                                </form>
                                                            </div>
                                                            {/*footer*/}
                                                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                                <button
                                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                    type="button"
                                                                    onClick={() => setShowModal(false)}
                                                                >
                                                                    Close
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                            </>
                                        ) : null}
                                        <button className="btn btn-ghost w-14 h-14" onClick={() => handleDeleteResult(match.match_code)}>
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
