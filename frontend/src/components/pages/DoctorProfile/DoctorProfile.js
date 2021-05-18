import React from "react";
import { DoctorProfileImg } from "utils";
import BasicInfo from "./BasicInfo";
import FieldsOfExperience from "./FieldsOfExperience";
import Notes from "./Notes";
import MaxProjects from "./MaxProjects";

function DoctorProfile() {
    const technology = [
        "Machine Learning",
        "Artifical Intelligence",
        "Web Application",
        "Others",
    ];
    return (
        <>
            <div className="row">
                <div className="col-sm-12 col-xs-12 col-md-6 col-lg-6">
                    <div className="row ml-3 mr-3 mt-3">
                        <DoctorProfileImg />
                    </div>

                    <div className="row ml-4 mr-4 mt-3">
                        <div className=" col-12 studentInfo">
                            <MaxProjects />
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-xs-12 col-md-6 col-lg-6">
                    <div className="row ml-4 mr-4 mt-5">
                        <div className=" col-12 studentInfo">
                            <BasicInfo />
                        </div>
                    </div>
                    <br></br>
                    <div className="row ml-4 mr-4 mt-5">
                        <div className="col-12 studentInfo">
                            <FieldsOfExperience tech={technology} />
                        </div>
                    </div>
                    <div className="row ml-4 mr-4 mt-5">
                        <div className="col-12 studentInfo">
                            <Notes />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoctorProfile;
