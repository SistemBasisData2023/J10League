import React from 'react'
import React, { useState, useEffect } from "react";
import styles from "../style";
import { Button } from "../components"; // Replace "your-button-library" with the actual library you're using for buttons

const DataManagement = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/upcomingMatches")
            .then((response) => response.json())
            .then((data) => setMatches(data))
            .catch((error) => console.error("Error fetching data", error));
    }, []);

    const handleAddMatch = () => {
        // Logic for adding a new match
    };

    const handleEditMatch = (index) => {
        // Logic for editing a specific match
    };

    const handleDeleteMatch = (index) => {
        // Logic for deleting a specific match
    };

    return (
        <div className={`overflow-x-auto mb-6 feature-card`}>
            <table className={`table ${styles.flexCenter}`}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Teams</th>
                        <th>Match Date</th>
                        <th></th>
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
                                                <img src={assets[match.tournament_id]} alt="page-icon" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{match.tournament_name}</div>
                                            <div className="text-sm opacity-50">{match.scope}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {match.team_code_1} vs {match.team_code_2}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">
                                        {match.stage} - {match.best_of}
                                    </span>
                                </td>
                                <td>{match.match_date}</td>
                                <td>
                                    <button className="btn btn-ghost btn-xs" onClick={() => handleEditMatch(index)}>
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-ghost btn-xs" onClick={() => handleDeleteMatch(index)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Button onClick={handleAddMatch}>Add Match</Button>
        </div>
    );
};

export default DataManagement