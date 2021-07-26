import { ProjectCard } from "components/cards";
import { CardColumns } from "react-bootstrap";
import { EditProject } from "components/Modals";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRequest } from "hooks";
import { getTeamProjects } from "requests";

const StudentProjectsPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [request, requesting] = useRequest(getTeamProjects);

    useEffect(() => {
        request({})
            .then((r) => {
                setProjects(r.data);
            })
            .catch(({ response }) => {
                toast.error(response.data.message);
                toast.error("Error getting all projects");
            });
    }, []);

    return (
        <div>
            <button
                onClick={() => setShowModal(true)}
                className="btn btn-lg btn-primary py-1 px-2 mr-1 mt-2 w-100"
                style={{
                    backgroundColor: "#00BFA6",
                    borderColor: "#00BFA6",
                    marginBottom: "10px",
                }}
                //data-toggle="modal"
                //data-target="#edit-project-modal"
            >
                Add New Project
            </button>
            <EditProject
                show={showModal}
                hide={() => setShowModal(false)}
                title=""
                brief_description=""
                tech={[]}
                btn="Add Project"
                type="Add"
            />

            <div className="row">
                <CardColumns>
                    {projects &&
                        projects.map((p, i) => (
                            <ProjectCard project={p} {...p} key={i} />
                        ))}
                </CardColumns>
            </div>
        </div>
    );
};
export default StudentProjectsPage;
