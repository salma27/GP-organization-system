import React from "react";
import {Badge, Card} from "react-bootstrap";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import { confirmAction } from "utils";

const TeamInfoCard = ({}) => {
    const leaveTeame = () => {
        confirmAction({
            message: "Are you sure you want to leave the team?",
            onConfirm: () => {},
        });
    };
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title className="d-flex">
                    <b>Team info</b>
                    <button className="btn btn-lg btn-outline-danger py-1 px-2 ml-auto" onClick={leaveTeame}>
                        leave team
                    </button>
                </Card.Title>
                <hr />
                <Card.Text>
                    <dl>
                        <dt>Teammates</dt>
                        <dd>
                            <a href="/">alen ryder, </a>
                            <a href="/">mickey mouse, </a>
                            <a href="/">donald duck</a>
                        </dd>

                        <dt>Supervising doctors</dt>
                        <dd>
                            <a href="/">Hesham, </a>
                            <a href="/">seham, </a>
                        </dd>

                        <dt>Supervising TA</dt>
                        <dd>Sara Elnady</dd>

                        <dt>Team's selected project</dt>
                        <dd>Online disney land</dd>

                        <dt>Team's technologies</dt>
                        <dd>non yet</dd>
                    </dl>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
export default TeamInfoCard;
