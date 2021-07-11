import React from "react";
import BasicInfo from "./BasicInfo";
import FieldsOfExperience from "./FieldsOfExperience";
import Notes from "./Notes";
import "./StudentProfile.css";
import { StudentProfileImg, ProfileImg } from "utils";
import { useAuthContext } from "hooks";

function StudentProfile() {
    const [auth] = useAuthContext();
    const technology = [
        "Machine Learning",
        "Artifical Intelligence",
        "Web Application",
        "Others",
    ];
    return (
        <>
            {/* <SearchBar /> */}
            <div className="row">
                <div className="col-12 col-md-6 mb-5">
                    <ProfileImg />
                </div>
                <div className="col-12 col-md-6 mb-5">
                    <div className="studentInfo">
                        <BasicInfo />
                    </div>
                </div>
                <div className="col-12 col-md-6 mb-5">
                    <div className="studentInfo">
                        <FieldsOfExperience tech={technology} />
                    </div>
                </div>
                <div className="col-12 col-md-6 mb-5">
                    <div className="studentInfo">
                        <Notes />
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentProfile;
