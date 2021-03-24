import React from "react";
import BasicInfo from "./BasicInfo";
import FieldsOfExperience from "./FieldsOfExperience";
import Notes from "./Notes";
import "./StudentProfile.css";
import {StudentProfileImg} from "utils";

function StudentProfile() {
    const technology = [
        "Machine Learning",
        "Artifical Intelligence",
        "Web Application",
        "Others",
    ];
    return (
        <>
            {/* <SearchBar /> */}
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
