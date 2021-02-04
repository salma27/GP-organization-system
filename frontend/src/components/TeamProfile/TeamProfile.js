import React from "react";
import { SideBar, TeamProfileImg } from "utils";
import "./TeamProfile.css";
import SearchBar from "../SearchBar/SearchBar";
import TeamMembers from "../TeamProfile/TeamMembers";

function TeamProfile() {
    return (
        <>
            <SearchBar />
            <SideBar />
            <TeamProfileImg />

            <div id="teamInfo">
                <TeamMembers />
            </div>
        </>
    );
}

export default TeamProfile;
