import { OldProjectCard } from "components/cards";
import { useRequest, useAuthContext } from "hooks";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getProjectsProvidedbySupervisor from "requests/getProjectsProvidedbySupervisor";
import {staffGetTeamProjects} from "requests";

import "styles/stickey.css";
const style = {
    // backgrounds from 1 to 5 i.e. feed_4
    backgroundImage: "url(/feed_7.svg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
height: "100%"
};
const Projects = (props) => {
    const {isStaff} = useAuthContext();
    const [btn, setBtn] = useState(props.btn);
    const [projects, setProjects] = useState([]);
    const [request, requesting] = useRequest(getProjectsProvidedbySupervisor);
    const [teamProjectsRequest,loading] = useRequest(staffGetTeamProjects);

    console.log("llllllllllllll",props);
    useEffect(() => {
        if(isStaff){
            if(props.isDr){
                request({id: props.state.res.ecomId})
                    .then((r) => {
                        setProjects(r.data);
                        toast.success("Projects loaded successfully");
                    })
                    .catch((e) => {
                        toast.error("Error viewing projects");
                    });
            }
            else {
                teamProjectsRequest({teamId:props.teamId})
                .then(r=>{
                    setProjects(r.data.projects);
                })
                .catch((e) => toast.error("Failed To Get Team's Projects"))
            }
            
        }else{
            request({id: props.state.res.ecomId})
            .then((r) => {
                setProjects(r.data);
                toast.success("Projects loaded successfully");
            })
            .catch(({ response }) => {
                toast.error(response.data.message);
                toast.error("Error viewing projects");
            });
        }
    }, []);
    return (
        <div className="container-fluid" style={style}>
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12  m-auto">
                            {projects.length ? (
                                projects.map((p, i) => (
                                    <OldProjectCard
                                        project={p}
                                        key={i}
                                        btn={btn}
                                        
                                    />
                                ))
                            ) : (
                                <h6>No provided Projects</h6>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Projects;
