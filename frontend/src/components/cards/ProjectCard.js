import React from "react";
import {Card} from "react-bootstrap";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";

const ProjectCard = ({title, brief_description}) => {
    return (
        <Card className="mb-3">
            <Card.Header className="d-flex">
                <div className="ml-auto">
                    <button className="btn btn-lg btn-outline-primary py-1 px-2 mr-1">
                        <AiFillEdit />
                    </button>
                    <button className="btn btn-lg btn-outline-danger py-1 px-2 mr-1">
                        <AiFillDelete />
                    </button>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{brief_description}</Card.Text>
            </Card.Body>
        </Card>
    );
};
export default ProjectCard;
