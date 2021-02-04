import React from "react";
import BasicInfo from "./BasicInfo";
import FieldsOfExperience from "./FieldsOfExperience";
import Notes from "./Notes";
import Title from "../../utils/Title";
import "./StudentProfile.css";
import SearchBar from "../SearchBar/SearchBar";
import StudentProfileImg from "../../utils/StudentProfileImg";

function StudentProfile() {
    const technology = [
        "Machine Learning",
        "Artifical Intelligence",
        "Web Application",
        "Others",
    ];
    return (
        <>
            <SearchBar />
            <StudentProfileImg />
            <div className="studentInfo">
                <BasicInfo />
            </div>
            <div className="studentInfo">
                <FieldsOfExperience tech={technology} />
            </div>
            <div className="studentInfo">
                <Notes />
            </div>
        </>
    );
}

export default StudentProfile;

/*

import React from "react";
import BasicInfo from "./BasicInfo";
import FieldsOfExperience from "./FieldsOfExperience";
import Notes from "./Notes";
import Title from "../../utils/Title";
import "./StudentProfile.css";
import SearchBar from "../SearchBar/SearchBar";

function StudentProfile() {
    const technology = [
        "Machine Learning",
        "Artifical Intelligence",
        "Web Application",
        "Others",
    ];
    return (
        <div>
            <SearchBar />
            <Title orange="Student's" black="Profile" />
            <div className="studentInfo">
                <BasicInfo />
                <FieldsOfExperience tech={technology} />
                <Notes />
            </div>
        </div>
    );
}

export default StudentProfile;
*/
