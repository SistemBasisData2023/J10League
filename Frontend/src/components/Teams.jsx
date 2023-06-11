import * as assets from "../assets";
import styles, { layout } from "../style";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    const handleInputChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            await axios.post("../assets/foto_team/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Image uploaded successfully
            console.log("Image uploaded successfully");
        } catch (error) {
            // Error uploading image
            console.error("Error uploading image", error);
        }
    };

    useEffect(() => {
        fetch("http://localhost:3001/teams")
            .then((response) => response.json())
            .then((data) => setTeams(data))
            .catch((error) => console.error("Error fetching data", error));
    }, []);

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-6xl lg:px-8">
            <h1 className="font-poppins font-semibold text-white text-center justify-center ss:text-[75px] text-[65px] sm:py-14 py-6">
                <span className="text-gradient">THE</span> TEAMS
            </h1>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {teams.map((team, index) => (
                    <a key={index} href={team.team_code} className="group">
                        <div className={`flex-1 flex md:my-0 my-10 relative`}>
                            <img
                                src={assets[team.team_code]}
                                alt={team.team_name}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                            {/* gradient start */}
                            <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
                            <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
                            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
                            {/* gradient end */}
                        </div>
                        <h3 className="text-center justify-center mt-1 text-lg font-poppins font-semibold text-white">{team.team_name}</h3>
                    </a>
                ))}
            </div>
            {sessionStorage.getItem('isLogin') && (
                <div className="pt-12">
                    <input type="file" onChange={handleInputChange} />
                    <button onClick={handleImageUpload}>Upload</button>
                </div>
            )}
        </div>
    )
}

export default Teams;