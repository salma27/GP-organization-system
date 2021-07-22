import {React,useState} from "react";
import {Badge, Card} from "react-bootstrap";
import {Link} from  "react-router-dom";
import * as r from "routes/routes";
import {Technologies} from "components/cards";
import AskToJoinMyTeam from "components/Modals/AskToJoinMyTeam";
import {RiMailSendLine} from "react-icons/ri"
import { useAuthContext } from "hooks";
import { confirmAction } from "utils";

const StudentCard = (props) => {  
    //const { isStaff } = useAuthContext();
    //const isStaff = !props.isStudent;
    const [projects, setProjects] = useState([]);
    const style = {
        border: "none",
        borderLeft: "1px solid hsla(200, 10%, 50%,100)",
        minHeight: "100px",
        width: "1px",
    };
    const [showModal, setShowModal] = useState(false);

    const confirm = () => {
        confirmAction({
            message: "Are you sure you want to send this request?",
            onConfirm: () => {},
        });
    };
    //const data = [id];
    
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title className="">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-3 col-md-1">
                            <img src="\profile.svg" className="mw-100"/>
                        </div>
                        <div className="col-9 col-md-7 col-lg-8">
                                <Link to={{
                                    pathname:props.isStudent?r.userInfo:r.staffInfo,
                                    state:{res: props.result, student: props.isStudent},
                                    }}>
                                    <b className="h6 font-weight-bold" style={{color:"black"}}>
                                        {props.result.name}
                                    </b>
                                </Link> 
                            
                            <p className="mb-0" style={{fontSize:"small",color:"black"}}>Department: <b style={{font:"caption"}}>{props.isStudent?props.result.departmentId:props.result.department}</b></p>
                            { !props.isStudent ? 
                                props.result.teamsSlots > 0 ? <p className="mb-0 text-success" style={{fontSize:"small"}}>Can take <b>{props.result.teamsSlots - props.result.teams.length}</b> teams</p>
                                    :<p className="mb-0 text-danger" style={{fontSize:"small"}}>Completed</p>
                                    :<></>
                            }
                        </div>
                        
                            <div className="d-none d-md-inline col-md-4 col-lg-3">
                            {/*{
                            ((!isStaff || (isStaff && props.isStudent)) && ((!props.isStudent && props.result.teamsSlots > 0)||props.isStudent)) && 
                            <>*/}
                                <button
                                    className="btn primary-btn py-1 px-2 mr-1 mb-1"
                                    
                                    onClick={() => props.isStudent?confirm():setShowModal(true)}
                                    >
                                        <RiMailSendLine className="mr-1"/> {!props.isStudent?"Ask To Be Supervisor":"Ask to join team"}
                                    </button>
                                    <AskToJoinMyTeam
                                    show={showModal}
                                    hide={() => setShowModal(false)}
                                    projects={projects}     
            
                                    />
                            {/*</>
                            }*/} 
                            </div>
                        
                    </div>
                    
                </Card.Title>
                <hr />
                <div className="row">
                    <div className="col-12 mb-1">
                        
                        <Technologies tech={props.isStudent? props.result.technologyIds:props.result.technologies} />
                    </div>
                </div>
               {/* {(!isStaff || (isStaff && props.isStudent)) &&*/}
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
                                onClick={() => props.isStudent?confirm():setShowModal(true)}
                            >
                                <RiMailSendLine className="mr-1"/> {!props.isStudent?"Ask To Bennn Supervisor":"Ask to join team"}
                            </button>
                            <AskToJoinMyTeam
                            show={showModal}
                            hide={() => setShowModal(false)}
                            projects={projects}

                            />
                        
                        </div>
                </div>
                {/*}*/}
               

            </Card.Body>
        </Card>
    );
};
export default StudentCard;
