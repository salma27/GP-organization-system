import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import * as r from "routes/routes";
import { confirmAction } from "utils";
import { useAuthContext } from "hooks";
import moment from "moment";

const RequestCard = ({title, join,ShowAcceptBtn=true,id,options,vote}) => {
    const { isStaff } = useAuthContext();

    const accept = () => {
        confirmAction({
            message: "Are you sure you want to accept this request?",
            onConfirm: () => {
                vote(id,options[0].id);
            },
        });
    };

    const decline = () => {
        confirmAction({
            message: "Are you sure you want to decline this request?",
            onConfirm: () => {
                vote(id,options[1].id);
            },
        });
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    {/* {isStaff &&  */}
                        <Link to={r.teamInfo}>
                            <b>{title}</b>
                        </Link>
                    {/* } */}
                </Card.Title>
                {/* <Card.Text>
                    {join
                        ? "This student wants you to join their team!"
                        : "This supervisor wants to supervise your team!"}
                </Card.Text> */}
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
