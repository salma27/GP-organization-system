import React from "react";
import {Badge, Card} from "react-bootstrap";

const StudentCard = ({name, num,isStudent, department, tech = []}) => {
    const style = {
        border: "none",
        borderLeft: "1px solid hsla(200, 10%, 50%,100)",
        minHeight: "100px",
        width: "1px",
    };
    
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title className="">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-3 col-md-1">
                            <img src="\profile.svg" className="mw-100"/>
                        </div>
                        <div className="col-9 col-md-7 col-lg-8">
                            <b className="h6 font-weight-bold" style={{color:"black"}}>{name}</b>
                            <p className="mb-0" style={{fontSize:"small",color:"black"}}>Department: <b style={{font:"caption"}}>{department}</b></p>
                            { !isStudent ? 
                                num > 0 ? <p className="mb-0 text-success" style={{fontSize:"small"}}>Can take <b>3</b> teams</p>
                                    :<p className="mb-0 text-danger" style={{fontSize:"small"}}>Completed</p>
                                    :<></>
                            }
                        </div>
                        <div className="d-none d-md-inline col-md-4 col-lg-3">
                            <button
                                className="btn btn-primary py-1 px-2 mr-1 mb-1"
                                style={{
                                    fontSize:"small",
                                    backgroundColor: "#00BFA6",
                                    borderColor: "#00BFA6",
                                    width:"100%"
                                }}
                            >
                                Ask to join in my team
                            </button>
                        </div>
                    </div>
                    
                </Card.Title>
                <hr />
                <div className="row">
                    <div className="col-12 mb-1">
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
                {/* <hr className="d-inline d-md-none"/> */}
                <div className="row">
                <div className="d-inline d-md-none col-12">
                        <button
                            className="btn btn-primary py-1 px-2 mr-1 mb-1"
                            style={{
                                fontSize:"small",
                                backgroundColor: "#00BFA6",
                                borderColor: "#00BFA6",
                                width:"100%"
                            }}
                        >
                            Ask to join in my team
                        </button>
                    </div>
                </div>

            </Card.Body>
        </Card>
    );
};
export default StudentCard;
