import React from "react";
import { DoctorProfileImg } from "utils";
import BasicInfo from "./BasicInfo";
import FieldsOfExperience from "./FieldsOfExperience";
import Notes from "./Notes";
import MaxProjects from "./MaxProjects";
import { Navbar } from "components/navbar";
import "styles/dashboard.css";
import { ProfileSidebar } from "components/sidebar";
import "styles/stickey.css";

function DoctorProfile() {
    const technology = [
        "Machine Learning",
        "Artifical Intelligence",
        "Web Application",
        "Others",
    ];

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-xs-12 col-md-6 col-lg-6">
                        <div className="row ml-1 mr-1 mt-5">
                            <DoctorProfileImg />
                        </div>

                        <div className="row ml-1 mr-1 mt-4 bg-red">
                            <div className=" col-12 studentInfo">
                                <MaxProjects />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-xs-12 col-md-6 col-lg-6">
                        <div className="row ml-1 mr-1 mt-1">
                            <div className=" col-12 studentInfo">
                                <BasicInfo />
                            </div>
                        </div>
                        <div className="row ml-1 mr-1 mt-1">
                            <div className="col-12 studentInfo">
                                <FieldsOfExperience tech={technology} />
                            </div>
                        </div>
                        <div className="row ml-1 mr-1 mt-1">
                            <div className="col-12 studentInfo">
                                <Notes />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoctorProfile;
