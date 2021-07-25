import React, {useEffect, useState} from "react";
import { DoctorProfileImg } from "utils";
import BasicInfo from "./BasicInfo";
import FieldsOfExperience from "./FieldsOfExperience";
import Notes from "./Notes";
import MaxProjects from "./MaxProjects";
import { Navbar } from "components/navbar";
import "styles/dashboard.css";
import { ProfileSidebar } from "components/sidebar";
import "styles/stickey.css";
import { useRequest } from "hooks";
import { staffgetProfile } from "requests";
import { toast } from "react-toastify";

function DoctorProfile() {
    const [data,setData] = useState();
    const [request,requesting] = useRequest(staffgetProfile);

    useEffect(() => {
        request({})
            .then(res=>{
                toast.success("Data loaded successfully");
                setData(res.data);
            })
            .catch(error=>{
                toast.error("Couldn't get profile");
            })
    }, [])

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
                        <div className="row ml-1 mr-1 mt-4">
                            <DoctorProfileImg />
                        </div>

                        <div className="row ml-1 mr-1 mt-4 bg-red">
                            <div className=" col-12 studentInfo">
                                <MaxProjects {...data}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-xs-12 col-md-6 col-lg-6">
                        <div className="row ml-1 mr-1 mt-2">
                            <div className=" col-12 studentInfo">
                                <BasicInfo  {...data}/>
                            </div>
                        </div>
                        <div className="row ml-1 mr-1 mt-1">
                            <div className="col-12 studentInfo">
                                <FieldsOfExperience tech={technology} />
                            </div>
                        </div>
                        <div className="row ml-1 mr-1 mt-1">
                            <div className="col-12 studentInfo">
                                <Notes {...data}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoctorProfile;
