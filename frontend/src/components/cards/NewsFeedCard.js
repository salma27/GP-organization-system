import moment from "moment";
import { AddNewsFeed } from "components/Modals";
import React, { useState } from "react";
import { Badge, Card } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { confirmAction } from "utils";

const NewsFeedCard = ({title, date, content}) => {
    const [showModal, setShowModal] = useState(false);
    const deleteProject = () => {
        confirmAction({
            message: "Are you sure you want to delete this project?",
            onConfirm: () => {},
        });
    };
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title className="d-flex">
                    <div style={{display:"flex",flexDirection:"column"}}>    
                        <b>{title}</b>
                        <span style={{fontSize:"small"}}>
                            {moment(date).format("DD/MM/YYYY  hh:mm a")}
                        </span>
                    </div>
                    <div className="ml-auto">
                        {/* <button
                            onClick={() => setShowModal(true)}
                            className="btn btn-lg btn-primary py-1 px-2 mr-1"
                            style={{
                                backgroundColor: "#00BFA6",
                                borderColor: "#00BFA6",
                            }}
                        >
                            <AiFillEdit />
                        </button> */}
                        
                        <button
                            className="btn btn-lg btn-outline-danger py-1 px-2 mr-1"
                            onClick={deleteProject}
                        >
                            <AiFillDelete />
                        </button>
                    </div>
                </Card.Title>
                <hr />
                <Card.Text className="d-flex">{content}</Card.Text>
            </Card.Body>
        </Card>
    );
};
export default NewsFeedCard;
