import React from "react";
import { SideBar } from "utils";

import SearchBar from "../SearchBar/SearchBar";
import TeamMembers from "../TeamProfile/TeamMembers";

function TeamProfile() {
    return (
        <>
            <SearchBar />
            <SideBar />
            <TeamMembers />
        </>
    );
}

export default TeamProfile;
