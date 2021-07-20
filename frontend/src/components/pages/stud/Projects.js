import { OldProjectCard } from "components/cards";
import { useRequest } from "hooks";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getProjectsProvidedbySupervisor from "requests/getProjectsProvidedbySupervisor";
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
};
const Projects = (props) => {
    const [btn, setBtn] = useState(props.btn);
    const [projects, setProjects] = useState([]);
    const [request, requesting] = useRequest(getProjectsProvidedbySupervisor);
    useEffect(() => {
        request({ id: props.state.id })
            .then((r) => {
                setProjects(r.data);
                toast.success("Projects loaded successfully");
            })
            .catch((e) => {
                toast.error("Error viewing projects");
            });
    }, []);

    return (
        <div className="container-fluid" style={style}>
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12  m-auto">
                            {projects &&
                                projects.map((p, i) => (
                                    <OldProjectCard {...p} key={i} btn={btn} />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Projects;
