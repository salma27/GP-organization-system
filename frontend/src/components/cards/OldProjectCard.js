import { useRequest, useAuthContext } from "hooks";
import React, { useEffect, useState } from "react";
import { Badge, Card, Toast } from "react-bootstrap";
import { RiMailSendLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getOneSupervisor, StudentAskToTakeSupervisorIdea, doctorRequestToBeSuberVisorProject, staffgetProfile, TARequestToBeSuberVisor } from "requests";
import * as r from "routes/routes";
import { confirmAction } from "utils";

const OldProjectCard = ({
    project,
    btn = false,
    showDr = false,
    showTeam = false,
}) => {
    const brief_description = project.description;
    const tech = project.technologyIds;
    const style = {
        border: "none",
        borderLeft: "1px solid hsla(200, 10%, 50%,100)",
        minHeight: "100px",
        width: "1px",
    };
    const [request, requesting] = useRequest(StudentAskToTakeSupervisorIdea);
    const [doctorRequest,doctorRequesting] = useRequest(doctorRequestToBeSuberVisorProject);
    const {isStaff} = useAuthContext();
    const [requestStaffProfile,profileLoding] = useRequest(staffgetProfile);
    const [taRequest,taRequestin] = useRequest(TARequestToBeSuberVisor);

    const confirm = () => { 
        if(!isStaff){
            confirmAction({
            message: "Are you sure you want to send this request?",
            onConfirm: () => {
                request({ projectId: project.id })
                    .then((r) => {
                        toast.success("Request sent successfully");
                    })
                    .catch((e) => {
                        toast.error("Error sending the request");
                    });
            },
            });
        }
        else{
            requestStaffProfile({})
                .then(res=>{
                    if(res.data.type===0){
                        confirmAction({
                            message: "Are you sure you want to send this request?",
                            onConfirm: () => {
                                doctorRequest({ projectId: project.id })
                                    .then((r) => {
                                        toast.success("Request sent successfully");
                                    })
                                    .catch((e) => {
                                        toast.error(e.response.data.message);
                                    });
                            },
                        });
                    }else{
                        confirmAction({
                            message: "Are you sure you want to send this request?",
                            onConfirm: () => {
                                taRequest({ projectId: project.id })
                                    .then((r) => {
                                        toast.success("Request sent successfully");
                                    })
                                    .catch((e) => {
                                        toast.error(e.response.data.message);
                                    });
                            },
                        });
                    }
                })
                .catch((e) => {

                })
        }
    };
    const [reuestDrName, reuestingDrName] = useRequest(getOneSupervisor);
    const [dr, setDr] = useState([]);
    useEffect(() => {
        if (showDr) {
            reuestDrName({ projectId: project.ownerId })
                .then((r) => {
                    setDr(r.data);
                })
                .catch((e) => {
                    toast.error("couldn't get idea's owner");
                });
        }
    }, []);
    const Hr = () => <hr style={style} />;
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title className="row team-header mw-100">
                    <div className="col-12 col-lg-8">
                        <b>{project.title}</b>
                        <p style={{ fontSize: "small" }}>
                            Department: <b>{project.departmentId}</b>
                        </p>
                        {showDr && (
                            <Link
                                to={{
                                    pathname: r.staffInfo,
                                    state: {
                                        res: dr,
                                        student: false,
                                    },
                                }}
                            >
                                <p style={{ fontSize: "small" }}>
                                    Dr / <a>{dr.name}</a>
                                </p>
                            </Link>
                        )}
                        {showTeam && (
                            <Link to={{ pathname:r.teamInfo, state:{teamId: project.ownerId}}}>
                                <span style={{ fontSize: "small",display:"block" }}>
                                    Go To The Team
                                </span>
                            </Link>
                        )}
                    </div>
                    {btn === true && (
                        <div className="col-12 col-lg-4 ">
                            <button
                                className="primary-btn py-1 px-2 mr-1 mb-1"
                                onClick={confirm}
                            >
                                <RiMailSendLine className="mr-1" /> Ask To Supervise
                            </button>
                        </div>
                    )}
                </Card.Title>
                <hr />
                <div className="row">
                    <div className="col-12 col-lg-8 border-right">
                        <Card.Text>{brief_description}</Card.Text>
                    </div>
                    <div className="col-12 col-lg-4">
                        <Card.Text>
                            {tech &&
                                tech.map((t, i) => (
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
                            {tech && !tech.length && "No technologies provided"}
                        </Card.Text>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};
export default OldProjectCard;
