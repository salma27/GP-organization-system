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
                    <div className="col-sm-12 col-xs-12 col-md-3 col-lg-3">
                        <div className="sidebar-item">
                            <div className="make-me-sticky">
                                <ProfileSidebar />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-xs-12 col-md-5 col-lg-5">
                        <div className="row ml-1 mr-1 mt-4">
                            <DoctorProfileImg />
                        </div>

                        <div className="row ml-1 mr-1 mt-4 bg-red">
                            <div className=" col-12 studentInfo">
                                <MaxProjects />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-xs-12 col-md-4 col-lg-4">
                        <div className="row ml-1 mr-1 mt-2">
                            <div className=" col-12 studentInfo">
                                <BasicInfo />
                            </div>
                        </div>
                        <br></br>
                        <div className="row ml-1 mr-1 mt-2">
                            <div className="col-12 studentInfo">
                                <FieldsOfExperience tech={technology} />
                            </div>
                        </div>
                        <div className="row ml-1 mr-1 mt-3">
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
