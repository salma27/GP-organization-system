import {React,useState} from "react";
import {ShowingNames,Technologies} from "components/cards";
import {RiMailSendLine} from "react-icons/ri";
import { useAuthContext } from "hooks";
import { confirmAction } from "utils";
import AskToJoinMyTeam from "components/Modals/AskToJoinMyTeam";

const projects=["pro1", "pro4", "pro5"];

const style = {
    // backgrounds from 1 to 5 i.e. feed_4
    backgroundImage: "url(/feed_7.svg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    // height:"100vh",
};
const students = ["sara","salma"]
const ShowinTeam = () => {
    const { isStaff } = useAuthContext();
    const [showModal, setShowModal] = useState(false);

    const confirm = () => {
        confirmAction({
            message: "Are you sure you want to send this request?",
            onConfirm: () => {},
        });
    };

    return ( 
        <div className="container-fluid" style={style}>
            <div className="row m-auto" style={{maxWidth:"100%"}}>
                <div className="col-12 personinfo-block">
                    <div className="row team-header">
                        <div className="col-12 col-lg-8">
                            <h2>Team Name</h2>  
                        </div>
                        <div className="col-12 col-lg-4">
                            <button className="primary-btn py-1 px-2 mr-1 mb-1" onClick={()=>isStaff?setShowModal(true):confirm()}>
                                <RiMailSendLine className="mr-1"/>{isStaff?"Ask To Be Supervisor":"Ask to join my team"}
                            </button>
                            <AskToJoinMyTeam
                                show={showModal}
                                hide={() => setShowModal(false)}
                                projects={projects}
        
                            />
                        </div>
                        
                    </div>
                    
                    <hr />
                    <ShowingNames title="Students" data={students} isStudent={true}/>
                    <hr />
                    <ShowingNames title="Supervising doctors" data={students} isStudent={false}/>
                    <hr />
                    <ShowingNames title="Supervising Teaching Assistants" data={students} isStudent={false}/>
                    <hr />
                    <Technologies tech={students}/>
                    
                </div>
            </div>
        </div>
    );
}
 
export default ShowinTeam;