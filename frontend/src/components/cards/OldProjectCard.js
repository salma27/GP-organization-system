import React from "react";
import { Badge, Card } from "react-bootstrap";
import { RiMailSendLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import * as r from "routes/routes";
import { confirmAction } from "utils";

const OldProjectCard = (props) => {
    /*{
    title,
    description,
    technologyIds,
    id,
    btn = false,
    name,
    showDr = false,
    showTeam = false,
    team,
}*/
    //const title = title;
    const btn = props.btn;
    const showDr = props.showDr ? props.showDr : false;
    const showTeam = props.showTeam ? props.showTeam : false;

    const brief_description = props.project.description;
    const tech = props.project.technologyIds;
    const style = {
        border: "none",
        borderLeft: "1px solid hsla(200, 10%, 50%,100)",
        minHeight: "100px",
        width: "1px",
    };

    const confirm = () => {
        confirmAction({
            message: "Are you sure you want to send this request?",
            onConfirm: () => {},
        });
    };

    const Hr = () => <hr style={style} />;
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title className="row team-header mw-100">
                    <div className="col-12 col-lg-8">
                        <b>{props.project.title}</b>
                        {showDr && (
                            <Link to={r.staffInfo}>
                                <p style={{ fontSize: "small" }}>
                                    dr / <b>name</b>
                                </p>
                            </Link>
                        )}
                        {showTeam && (
                            <Link to={r.teamInfo}>
                                <p style={{ fontSize: "small" }}>
                                    team / <b>team</b>
                                </p>
                            </Link>
                        )}
                    </div>
                    {btn === true && (
                        <div className="col-12 col-lg-4 ">
                            <button
                                className="primary-btn py-1 px-2 mr-1 mb-1"
                                onClick={confirm}
                            >
                                <RiMailSendLine className="mr-1" /> Ask To Be
                                Supervisor
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
