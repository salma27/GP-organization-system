import { OldProjectCard } from "components/cards";
import { useRequest, useAuthContext } from "hooks";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getProjectsProvidedbySupervisor from "requests/getProjectsProvidedbySupervisor";
import {staffGetTeamProjects} from "requests";

import "styles/stickey.css";
/*
const projects = [
    {
        title: "Tbdel",
        brief_description:
            "an online platform that people can exchange their old items together on",
        tech: ["ML", "Web development", "Mobile app development"],
    },
    {
        title: "GP organizer",
        brief_description:
            "A faculty platformfor student to register their ideas and form teams on",
        tech: ["ML", "Web development", "Mobile app development"],
    },
    {
        title: "Gold digger",
        brief_description: "a gold stock pridector using ML",
        tech: ["ML", "Web development"],
    },
    {
        title: "Tbdel",
        brief_description:
            "an online platform that people can exchange their old items together on",
        tech: ["Mobile app development"],
    },
    {
        title: "Gold digger",
        brief_description:
            "Nullam fermentum quam interdum tortor fermentum auctor. Morbi in venenatis lectus. In dignissim iaculis nisi ultricies dictum. Aliquam erat volutpat",
    },
    {
        title: "GP organizer",
        brief_description:
            "A faculty platformfor student to register their ideas and form teams on",
        tech: ["ML", "Web development"],
    },
    {
        title: "GP organizer",
        brief_description:
            "A faculty platformfor student to register their ideas and form teams on",
        tech: ["ML", "Web development", "Mobile app development"],
    },
    {
        title: "GP organizer",
        brief_description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac nisl rhoncus, dapibus felis vel, aliquet mi. Praesent non turpis nec sapien faucibus ornare eu efficitur eros. In finibus ultrices porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi vitae mattis nisl.",
    },
];
*/
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

    useEffect(() => {
        if(isStaff){
            teamProjectsRequest({teamId:props.teamId})
                .then(r=>{
                    setProjects(r.data.projects);
                })
                .catch((e) => toast.error("Failed To Get Team's Projects"))
        }else{
            request({id: props.state.res.ecomId})
            .then((r) => {
                setProjects(r.data);
                toast.success("Projects loaded successfully");
            })
            .catch((e) => {
                toast.error("Error viewing projects");
            });
        }
    }, []);
    // console.log("id: ", props.state.id, " projects: ", projects);
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
