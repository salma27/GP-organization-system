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
            <Title
                orange="Student's"
                black="Profile"
                backgroundColor="lightgoldenrodyellow"
            />
            <BasicInfo />
            <FieldsOfExperience tech={technology} />
            <Notes />
        </div>
    );
}

export default StudentProfile;
