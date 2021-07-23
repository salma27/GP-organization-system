import { FilterCard, OldProjectCard } from "components/cards";
import { Navbar } from "components/navbar";
import { useRequest } from "hooks";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getOldProjects } from "requests";
import "styles/stickey.css";

const style = {
    // backgrounds from 1 to 5 i.e. feed_4
    backgroundImage: "url(/feed_7.svg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
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
                            />
                        </div>
                        <div className="col-12 col-lg-7 offset-lg-1">
                            {projects.map((p, i) => (
                                <OldProjectCard
                                    project={p}
                                    btn={false}
                                    key={i}
                                />
                            ))}
                        </div>
                        <div className="d-none d-lg-inline col-lg-4">
                            <div className="sidebar-item">
                                <div className="make-me-sticky">
                                    <FilterCard

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
