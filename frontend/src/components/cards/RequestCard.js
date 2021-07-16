import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {studentProfileRoute} from "routes/routes";
import { confirmAction } from "utils";

const RequestCard = ({name, join,ShowAcceptBtn=true}) => {
    const accept = () => {
        confirmAction({
            message: "Are you sure you want to accept this request?",
            onConfirm: () => {},
        });
    };

    const decline = () => {
        confirmAction({
            message: "Are you sure you want to decline this request?",
            onConfirm: () => {},
        });
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    <Link to={studentProfileRoute}>
                        <b>{name}</b>
                    </Link>
                </Card.Title>
                <Card.Text>
                    {join
                        ? "This student wants you to join their team!"
                        : "This supervisor wants to supervise your team!"}
                </Card.Text>
                <hr/>
                <Card.Text className="d-flex">
                    <div className="ml-auto">
                        {ShowAcceptBtn && 
                            <button
                                className="btn btn-primary py-1 px-2 mr-1"
                                style={{
                                    backgroundColor: "#00BFA6",
                                    borderColor: "#00BFA6",
                                }}
                                onClick={accept}
                            >
                                Accept
                            </button>
                        }
                        <button className="btn btn-outline-danger py-1 px-2 mr-1" onClick={decline}>
                            Decline
                        </button>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
export default RequestCard;
