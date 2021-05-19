import React from "react";
import { Badge, Card } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const SupervisedProjectCard = ({ title, brief_description, tech = [] }) => {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title className="d-flex">
                    <b>{title}</b>
                    <div className="ml-auto">
                        <button
                            className="btn btn-lg btn-primary py-1 px-2 mr-1"
                            style={{
                                backgroundColor: "#00BFA6",
                                borderColor: "#00BFA6",
                            }}
                        >
                            <AiFillEdit />
                        </button>
                        <button className="btn btn-lg btn-outline-danger py-1 px-2 mr-1">
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
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <a className="block-example border-bottom border-info text-info">
                        See More...
                    </a>
                </div>
            </Card.Body>
        </Card>
    );
};
export default SupervisedProjectCard;
