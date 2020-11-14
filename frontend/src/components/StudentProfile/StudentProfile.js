import React from "react";
import BasicInfo from "./BasicInfo";
import FieldsOfExperience from "./FieldsOfExperience";
import Notes from "./Notes";
import Title from "../../Utils/Title";
import "./StudentProfile.css";

function StudentProfile() {
    const technology = [
        "Machine Learning",
        "Artifical Intelligence",
        "Web Application",
        "Others",
    ];
    return (
        <div>
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
