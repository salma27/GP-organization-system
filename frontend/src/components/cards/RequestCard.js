import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as r from "routes/routes";
import { confirmAction } from "utils";
import { useAuthContext, useRequest } from "hooks";
import { getStudentRequests } from "requests";
import { toast } from "react-toastify";

const RequestCard = (props) => {
    const ShowAcceptBtn = props.ShowAcceptBtn;
    //const join = props.join;
    const { isStaff } = useAuthContext();
    const [request, requesting] = useRequest(getStudentRequests);
    const accept = () => {
        confirmAction({
            message: "Are you sure you want to accept this request?",

            onConfirm: () => {
                request({
                    pollId: props.req.id,
                    pollOptionId: props.req.options[0].id,
                })
                    .then((r) => {
                        toast.success("you voted successfully");
                    })
                    .catch(({ response }) => {
                        toast.error(response.data.message);
                        toast.error("Error accepting request");
                    });
            },
        });
    };

    const decline = () => {
        confirmAction({
            message: "Are you sure you want to decline this request?",
            onConfirm: () => {
                request({
                    pollId: props.req.id,
                    pollOptionId: props.req.options[1].id,
                })
                    .then((r) => {
                        toast.success("Request declined");
                    })
                    .catch(({ response }) => {
                        toast.error(response.data.message);
                        toast.error("Error declining request");
                    });
            },
        });
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    {/* <Link to={r.teamInfo}>
                        <b>{name}</b>
                    </Link>
    */}
                </Card.Title>
                <Card.Text>
                    {props.req.title}

                    {/*{join
                        ? "This student wants you to join their team!"
                        : "This supervisor wants to supervise your team!"}
                */}
                </Card.Text>
                <hr />
                <Card.Text className="d-flex">
                    <div className="ml-auto">
                        {ShowAcceptBtn && (
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
                        )}
                        <button
                            className="btn btn-outline-danger py-1 px-2 mr-1"
                            onClick={decline}
                        >
                            Decline
                        </button>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
export default RequestCard;
