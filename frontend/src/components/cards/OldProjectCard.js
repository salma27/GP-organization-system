import React from "react";
import {Badge, Card} from "react-bootstrap";
import {RiMailSendLine} from "react-icons/ri";
import {Link} from "react-router-dom";
import * as r from "routes/routes";

const OldProjectCard = ({title, brief_description, tech = [],btn=false,name,showDr=false,showTeam=false,team}) => {
    const style = {
        border: "none",
        borderLeft: "1px solid hsla(200, 10%, 50%,100)",
        minHeight: "100px",
        width: "1px",
    };

    const Hr = () => <hr style={style} />;
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title className="row team-header mw-100">
                    <div className="col-12 col-lg-8">
                        <b>{title}</b>
                        {showDr && <Link to={r.staffInfo}><p style={{fontSize:"small"}}>dr / <b>{name}</b></p></Link>}
                        {showTeam && <Link to={r.teamInfo}><p style={{fontSize:"small"}}>team / <b>{team}</b></p></Link>}
                    </div>
                    {btn===true &&
                    <div className="col-12 col-lg-4 ">
                        <button className="primary-btn py-1 px-2 mr-1 mb-1"><RiMailSendLine className="mr-1"/> Ask To Be Supervisor</button>
                    </div>}                    
                </Card.Title>
                <hr />
                <div className="row">
                    <div className="col-12 col-lg-8 border-right">
                        <Card.Text>{brief_description}</Card.Text>
                    </div>
                    <div className="col-12 col-lg-4">
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
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};
export default OldProjectCard;
