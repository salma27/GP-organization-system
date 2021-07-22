import React, { useEffect, useState } from "react";
import BasicInfo from "./BasicInfo";
import FieldsOfExperience from "./FieldsOfExperience";
import Notes from "./Notes";
import "./StudentProfile.css";
import { StudentProfileImg, ProfileImg } from "utils";
import { useAuthContext, useRequest } from "hooks";
import { getAllTechnologies } from "requests";
import { toast } from "react-toastify";
import getMyProfile from "requests/getMyProfile";

function StudentProfile() {
    const { auth } = useAuthContext();
    const [request, requesting] = useRequest(getMyProfile);
    const [profile, setProfile] = useState([]);
    useEffect(() => {
        request({})
            .then((r) => {
                setProfile(r.data);
            })
            .catch((e) => {
                toast.error("Error loading profile info");
            });
    }, []);
    return (
        <>
            <div className="row">
                <div className="col-12 col-md-6 mb-5">
                    <ProfileImg />
                </div>
                <div className="col-12 col-md-6 mb-5">
                    <div className="studentInfo">
                        <BasicInfo info={profile} />
                    </div>
                </div>
                <div className="col-12 col-md-6 mb-5">
                    <div className="studentInfo">
                        <FieldsOfExperience profile={profile} />
                    </div>
                </div>
                <div className="col-12 col-md-6 mb-5">
                    <div className="studentInfo">
                        <Notes info={profile} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentProfile;
