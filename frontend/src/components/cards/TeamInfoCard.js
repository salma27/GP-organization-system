import { useRequest } from "hooks";
import React, { useEffect, useState } from "react";
import { Badge, Card } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getMyTeam, studentLeaveTeam } from "requests";
import { confirmAction } from "utils";
import * as r from "routes/routes";

const TeamInfoCard = ({}) => {
    const [requestLeave, requestingLeave] = useRequest(studentLeaveTeam);
    const leaveTeam = (e) => {
        e.preventDefault();
        confirmAction({
            message: "Are you sure you want to leave the team?",
            onConfirm: () => {
                requestLeave({})
                    .then((r) => {
                        toast.success("You left the team");
                    })
                    .catch(({ response }) => {
                        toast.error(response.data.message);
                        toast.error("Coudln't leave the team");
                    });
            },
        });
    };
    const [doctors, setDoctors] = useState([]);
    const [TAs, setTAs] = useState([]);
    const [request, requesting] = useRequest(getMyTeam);
    const [team, setTeam] = useState([]);
    useEffect(() => {
        request({})
            .then((r) => {
                setTeam(r.data);

                const arr1 = [];
                const arr2 = [];
                r.data.supervisors.forEach((element) => {
                    if (element.type === 0) {
                        arr1.push(element);
                    }
                    if (element.type === 1) {
                        arr2.push(element);
                    }
                });

                setDoctors(arr1);
                setTAs(arr2);

                toast.success("data loaded successfully");
            })
            .catch(({ response }) => {
                toast.error(response.data.message);
                toast.error("Error showing team information");
            });
    }, []);
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title className="d-flex">
                    <b>Team info</b>
                    <button
                        className="btn btn-lg btn-outline-danger py-1 px-2 ml-auto"
                        onClick={leaveTeam}
                    >
                        leave team
                    </button>
                </Card.Title>
                <hr />
                <Card.Text>
                    <dl>
                        <dt>Teammates</dt>
                        <dd>
                            {team.students &&
                                team.students.map((student, i) => (
                                    <>
                                        <Link
                                            key={i}
                                            to={{
                                                pathname: r.userInfo,
                                                state: {
                                                    res: student,
                                                    student: true,
                                                },
                                            }}
                                        >
                                            <a>{student.name}</a>
                                        </Link>
                                        <br />
                                    </>
                                ))}
                        </dd>

                        <dt>Supervising doctors</dt>
                        <dd>
                            {doctors &&
                                doctors.map((dr, i) => (
                                    <>
                                        <Link
                                            key={i}
                                            to={{
                                                pathname: r.staffInfo,
                                                state: {
                                                    res: dr,
                                                    student: false,
                                                },
                                            }}
                                        >
                                            <a>{dr.name}</a>
                                        </Link>
                                        <br />
                                    </>
                                ))}
                        </dd>

                        <dt>Supervising TA</dt>
                        <dd>
                            {TAs &&
                                TAs.map((ta, i) => (
                                    <>
                                        <Link
                                            key={i}
                                            to={{
                                                pathname: r.staffInfo,
                                                state: {
                                                    res: ta,
                                                    student: false,
                                                },
                                            }}
                                        >
                                            <a>{ta.name}</a>
                                        </Link>
                                        <br />
                                    </>
                                ))}
                        </dd>

                        <dt>Team's selected project</dt>
                        <dd>{team.mainProject && team.mainProject.title}</dd>

                        <dt>Team's technologies</dt>
                        <dd>
                            
                            {team.technologies &&
                                team.technologies.map((tech, i) => (
                                    <>
                                        <label key={i}>{tech.name}</label>
                                        <br />
                                    </>
                                ))}
                            {team.technologies &&
                                !team.technologies &&
                            "No Provided Technologies"}
                           
                        </dd>
                    </dl>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
export default TeamInfoCard;
