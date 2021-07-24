import SupervisedProjectSeeMore from "components/Modals/SupervisedProjectSeeMore";
import React, { useState } from "react";
import { Badge, Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ImExit } from "react-icons/im";
import { confirmAction } from "utils";
import { useRequest } from 'hooks';
import { staffLeaveTeam } from "requests";
import { toast } from "react-toastify";

const SupervisedProjectCard = ({
    title="",
    brief_description="",
    tech = [],
    students = [],
    TA = [],
    Dr = [],
    id=""
}) => {
    const [showModal, setShowModal] = useState(false);
    const [request,requesting] = useRequest(staffLeaveTeam);

    const leaveTeam = () => {
        confirmAction({
            message: "Are you sure you want to leave this team?",
            onConfirm: () => {//leave team request
                request({projectId:id})
                .then((res) => {
                    toast.success("you left team")
                })
                .catch(error => {
                    toast.error("Failed")
                })
            },
        });
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Leave Team
        </Tooltip>
    );
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title className="d-flex">
                    {title.length?<b>{title}</b>:<b>Not Choose Yet</b>}
                    <div className="ml-auto">
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 0, hide: 0 }}
                            overlay={renderTooltip}
                        >
                            <Button className="btn btn-lg btn-danger py-1 px-2 mr-1" onClick={leaveTeam}>
                                <ImExit />
                            </Button>
                        </OverlayTrigger>
                    </div>
                </Card.Title>
                <hr />
                <Card.Text>{brief_description.length?brief_description:"There isn't description yet"}</Card.Text>
                <hr />
                <Card.Text>
                    {tech.map((t, i) => (
                        <Badge
                            pill
                            style={{
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
                <hr />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        onClick={() => setShowModal(true)}
                        className=" text-info font-weight-bold"
                        style={{
                            background: "none",
                            border: "none",
                            padding: "0",
                            textDecoration: "underline",
                            cursor: "pointer",
                        }}
                    >
                        See More...
                    </Button>
                    <SupervisedProjectSeeMore
                        show={showModal}
                        hide={() => setShowModal(false)}
                        title={title}
                        brief_description={brief_description}
                        tech={tech}
                        students={students}
                        TA={TA}
                        Dr={Dr}
                    />
                </div>
            </Card.Body>
        </Card>
    );
};
export default SupervisedProjectCard;
