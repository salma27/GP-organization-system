import React from 'react';
import {ShowingNames,Technologies} from "components/cards";
import {RiMailSendLine} from "react-icons/ri";
import { useAuthContext } from "hooks";

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

    return ( 
        <div className="container-fluid" style={style}>
            <div className="row m-auto" style={{maxWidth:"100%"}}>
                <div className="col-12 personinfo-block">
                    <div className="row team-header">
                        <div className="col-12 col-lg-8">
                            <h2>Team Name</h2>  
                        </div>
                        <div className="col-12 col-lg-4">
                            <button className="primary-btn py-1 px-2 mr-1 mb-1">
                                <RiMailSendLine className="mr-1"/>{isStaff?"Ask To Be Supervisor":"Ask to join my team"}
                            </button>
                        </div>
                        
                    </div>
                    
                    <hr />
                    <ShowingNames title="Students" data={students}/>
                    <hr />
                    <ShowingNames title="Supervising doctors" data={students}/>
                    <hr />
                    <ShowingNames title="Supervising Teaching Assistants" data={students}/>
                    <hr />
                    <Technologies tech={students}/>
                    
                </div>
            </div>
        </div>
    );
}
 
export default ShowinTeam;