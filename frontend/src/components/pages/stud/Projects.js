import { OldProjectCard } from "components/cards";
import { useRequest } from "hooks";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getProjectsProvidedbySupervisor from "requests/getProjectsProvidedbySupervisor";
import "styles/stickey.css";
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
        request({ id: props.state.res.ecomId })
            .then((r) => {
                setProjects(r.data);

                toast.success("Projects loaded successfully");
            })
            .catch(({ response }) => {
                toast.error(response.data.message);
                toast.error("Error viewing projects");
            });
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
                                        supervisorID={props.state.res.ecomId}
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
