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
                    <div className="col-12">
                        <Navbar />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-xs-12 col-md-2 col-lg-2">
                        <div className="sidebar-item">
                            <div className="make-me-sticky">
                                <ProfileSidebar />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-xs-12 col-md-5 col-lg-5">
                        <div className="row ml-3 mr-3 mt-2">
                            <DoctorProfileImg />
                        </div>

                        <div className="row ml-4 mr-4 mt-2">
                            <div className=" col-12 studentInfo">
                                <MaxProjects />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-xs-12 col-md-5 col-lg-5">
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
            </div>
        </>
    );
}

export default DoctorProfile;
