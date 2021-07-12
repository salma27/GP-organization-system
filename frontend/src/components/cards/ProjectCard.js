import { EditProject } from "components/Modals";
import React, { useState } from "react";
import { Badge, Card } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { confirmAction } from "utils";

const ProjectCard = ({ title, brief_description, tech = [] }) => {
    const [showModal, setShowModal] = useState(false);
    const deleteProject = () => {
        confirmAction({
            message: "are you sure you want to delete this project?",
            onConfirm: () => {},
        });
    };
    return (
        <>
            <Card className="mb-3">
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
                            <EditProject
                                btn="Update"
                                show={showModal}
                                hide={() => setShowModal(false)}
                                title={title}
                                brief_description={brief_description}
                                tech={tech}
                            />
                            <button
                                className="btn btn-lg btn-outline-danger py-1 px-2 mr-1"
                                onClick={deleteProject}
                            >
                                <AiFillDelete />
                            </button>
                        </div>
                    </Card.Title>
                    <hr />
                    <Card.Text>{brief_description}</Card.Text>
                    <hr />
                    <Card.Text>
                        {tech.map((t, i) => (
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
                        {!tech.length && "No technologies provided"}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};
export default ProjectCard;
