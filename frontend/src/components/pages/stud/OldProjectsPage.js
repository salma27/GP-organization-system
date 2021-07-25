import { FilterCard, OldProjectCard } from "components/cards";
import { Navbar } from "components/navbar";
import { useRequest } from "hooks";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getOldProjects } from "requests";
import "styles/stickey.css";
import { Paginate } from "utils";

const style = {
    // backgrounds from 1 to 5 i.e. feed_4
    backgroundImage: "url(/feed_7.svg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
height: "100%"
};
const OldProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [request, requesting] = useRequest(getOldProjects);

    useEffect(() => {
        request({})
            .then((r) => {
                setProjects(r.data);
            })
            .catch(({ response }) => {
                toast.error(response.data.message);
                toast.error("Error getting old projects");
            });
    }, []);

    const setNewProjects = (newProjects) => {
        setProjects(newProjects);
    };

    return (
        <div className="container-fluid" style={style}>
            <div className="row">
                <div className="col-12">
                    <Navbar />
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 d-inline d-lg-none">
                            <FilterCard
                                //setProject={setNewProjects}
                                setProjects={setProjects}
                                request={request}
                            />
                        </div>
                        <div className="col-12 col-lg-7 offset-lg-1">
                            <Paginate>
                                {projects.map((p, i) => (
                                    <OldProjectCard
                                        project={p}
                                        btn={false}
                                        key={i}
                                    />
                                ))}
                            </Paginate>
                        </div>
                        <div className="d-none d-lg-inline col-lg-4">
                            <div className="sidebar-item">
                                <div className="make-me-sticky">
                                    <FilterCard
                                        setProjects={setProjects}
                                        request={request}
                                        //setProjects={setNewProjects}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default OldProjectsPage;
