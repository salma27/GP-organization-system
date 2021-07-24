import { EditProject, AddDoctorProject } from "components/Modals";
import { useRequest } from "hooks";
import React, { useState } from "react";
import { Badge, Card } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { deleteTeamProjectRequests, staffEditDoctorProject, staffDeleteDoctorProject } from "requests";
import { confirmAction } from "utils";

const ProjectCard = ({ title, description, technologyIds=[], id,docotorDeleteProject=false }) => {
    const [showModal, setShowModal] = useState(false);
    const [request, requesting] = useRequest(deleteTeamProjectRequests);
    const [deleteRequest,deleteRequesting] = useRequest(staffDeleteDoctorProject);

    const deleteProject = () => {
        confirmAction({
            message: "Are you sure you want to delete this project?",
            onConfirm: () => {
                if(docotorDeleteProject){
                    deleteRequest({projectId:id})
                        .then(res=>{
                            toast.success(res.data.message);
                            window.location.reload();
                        })
                        .catch(e=>{
                            toast.error("Failed");
                        })
                }else{
                    request({ projectId: id })
                    .then((r) => {
                        toast.success("Project deleted successfully");
                    })
                    .catch((e) => {
                        toast.error("Coudln't delete the project");
                    });
                }
                
            },
        });
    };
    return (
        <>
            <Card className="mb-3 w-100">
                <Card.Body>
                    <Card.Title className="d-flex">
                        <b>{title}</b>

                        <div className="ml-auto">
                            <button
                                onClick={() => setShowModal(true)}
                                className="btn btn-lg btn-primary py-1 px-2 mr-1"
                                style={{
                                    backgroundColor: "#00BFA6",
                                    borderColor: "#00BFA6",
                                }}
                            >
                                <AiFillEdit />
                            </button>
                            {(!docotorDeleteProject && showModal) &&
                                <EditProject
                                    btn="Update"
                                    show={showModal}
                                    hide={() => setShowModal(false)}
                                    title={title}
                                    brief_description={description}
                                    tech={technologyIds}
                                    projectId={id}
                                    type="Edit"
                                />
                            }
                            {(docotorDeleteProject && showModal) &&///
                                <AddDoctorProject
                                    btn="Update"
                                    show={showModal}
                                    hide={() => setShowModal(false)}
                                    title={title}
                                    description={description}
                                    tech={technologyIds}
                                    projectId={id}
                                    type="Edit"
                                    request={staffEditDoctorProject}
                                />
                            }
                            <button
                                className="btn btn-lg btn-outline-danger py-1 px-2 mr-1"
                                onClick={deleteProject}
                            >
                                <AiFillDelete />
                            </button>
                        </div>
                    </Card.Title>
                    <hr />
                    <Card.Text>{description}</Card.Text>
                    <hr />
                    <Card.Text>
                        {technologyIds.map((t, i) => (
                            <Badge
                                pill
                                style={{
                                    // backgroundColor: "white",
                                    color: "#00BFA6",
                                    borderColor: "#00BFA6",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                }}
                                className="mr-1 mb-1"
                                key={i}
                            >
                                {t}
                            </Badge>
                        ))}
                        {!technologyIds.length && "No technologies provided"}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};
export default ProjectCard;
