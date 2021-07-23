import React, { useState } from 'react';
import "./../../css/personInfoCard.css";
import {RiMailSendLine} from "react-icons/ri"
import { confirmAction } from "utils";
import { useAuthContext } from "hooks";
import { AskToJoinMyTeam } from 'components/Modals';

const PersonInfo = ({show=false,btn=false, info}) => {
    const { isStaff } = useAuthContext();
    const [showModal, setShowModal] = useState(false);
    const [projects, setProjects] = useState([]);
    
    
    
    
    const confirm = () => {
        confirmAction({
            message: "Are you sure you want to send this request?",
            onConfirm: () => {},
        });
    };
    const requestModal = () =>{
        setShowModal(true);
    }
    const takenTeams = info.teams?info.teams.length:0;
    return ( 
        <div className="personinfo-block" >
            {!isStaff && btn &&
             <>   
                <div className="left-link">
                    <button className="btn primary-btn py-1 px-2 mr-1 mb-1 w-auto" onClick={show?requestModal:confirm}>
                        <RiMailSendLine className="mr-1"/>{show?"Ask To Be a Supervisor":"Ask to join team"}
                    </button>
                </div>
                <hr className="mt-1"/> 
                <AskToJoinMyTeam
                    show={showModal}
                    hide={() => setShowModal(false)}
                    projects={projects} 
                    supervisorID = {info.ecomId} 
                />
               </> 
            }
            <div className="row container center-row m-0">
                
                <div className="col-12 col-lg-3 center-row" style={{}}>
                    <img src="\profile.svg" className=" mw-100 mh-100 photo"/>
                </div>
                <div className="col-12 col-lg-9 personinfo-body" style={{}}>
                    <div className="personInfo row">
                        <div className="col-12 col-lg-3 mb-1">
                            <label className="personInfo-hidder">Name</label>
                        </div>
                        <div className="col-11 m-auto col-lg-9 person-info-p">
                            <p className="personInfo-second-text">{info.name}</p>
                        </div>
                    </div>
                    
                    <div className="personInfo row mb-0">
                        <div className="col-12 col-lg-3 mb-1">
                            <label className="personInfo-hidder">Department</label>
                        </div>
                       {!show &&
                            <div className="col-11 m-auto col-lg-9 person-info-p">
                                <p className="personInfo-second-text">{info.departmentId}</p>
                            </div>
                        }
                        {show && (
                            <>
                            <div className="col-11 m-auto col-lg-2 person-info-p">
                                <p className="personInfo-second-text">{info.department}</p>
                            </div>
                                <div className="col-12 col-lg-4 mb-1">
                                    <label className="personInfo-hidder">Number Of Teams</label>
                                </div>
                                <div className="col-11 m-auto col-lg-3 person-info-p">
                                    <p className="personInfo-second-text">{takenTeams}</p>
                                    
                                </div>
                                <div className="align-center">The supervisor can take {info.teamsSlots - takenTeams} teams more</div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            
        </div>
    );
}
 
export default PersonInfo;