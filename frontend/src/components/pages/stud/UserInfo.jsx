import React, {useEffect, useState} from 'react';
import {Navbar} from "components/navbar";
import {PersonInfo,Technologies,Note} from "components/cards";
import "./../../../css/personInfoCard.css";
import {FaHandPointRight} from "react-icons/fa";
import {Link, useLocation, useParams} from "react-router-dom";
import * as r from "routes/routes";
import { SettingsInputSvideoRounded } from '@material-ui/icons';
import { toast } from 'react-toastify';
import { useRequest } from 'hooks';
import getAllStudents from 'requests/getAllStudents';
import getOneStudent from 'requests/getOneStudent';
import { getOneSupervisor } from 'requests';

const style = {
    // backgrounds from 1 to 5 i.e. feed_4
    backgroundImage: "url(/feed_7.svg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    // height:"100vh",
};

const tech = ["ML", "Web development","AI"]

const UserInfo = (props) => {
const location = useLocation();
const { id, student } = location.state;
const isStudent = student;
const [show, setShow] = useState(props.show?props.show:false);
const [btn, setBtn] = useState(props.btn?props.btn:false);


    const [request, requesting] = useRequest(isStudent?getOneStudent:getOneSupervisor);
    const [user, setUser] = useState([]);
    
useEffect(() => {
    request({id:id})
    .then((r)=>{
        setUser(r.data);
        toast.success("data loaded successfully");
    })
    .catch((e)=>{
        toast.error(isStudent?"Error showing student information":"Error showing supervisor information");
    })
}, []);


    return (
        <div className="container-fluid" style={style}>
            <div className="row" >
                {/* <figure className="figure col-2 mx-auto personImg">
                    <img src="\profile.svg" className="figure-img img-fluid rounded mx-auto " alt="..."/>
                    <figcaption className="figure-caption text-center">سهيل هاني محمد صلاح الدين محمد فوزي </figcaption>
                </figure> */}
                {/* ,paddingTop:"15%" */}
                
                
                <div className="col-12 col-lg-12 m-auto" >
                    {/* <div>
                        <button style={{width:"50%",backgroundColor:"green"}}>person information</button>
                        <button style={{width:"50%",backgroundColor:"green"}}>team information</button>
                    </div> */}
                    <PersonInfo show={show} btn={btn} info={user} isStudent={isStudent}/>
                    <hr />
                    
                    <div className="personinfo-block">
                        <h5 className="personInfo-hidder w-fit-mb">Technologies </h5>
                        <Technologies tech={isStudent?user.technologyIds: user.technologies} />
                    </div>
                    <hr />
                    <Note note={user.bio}/>
                    {/* <hr />
                    <div className="left-link">
                        <Link to={r.teamInfo} className="personInfo-hidder link-btn w-auto">Go To Team <FaHandPointRight />
                        </Link>
                    </div> */}
                    
                </div>
                {/* <div className="col-3 " className="back" >
                    <img src="/imgs/profileInfo.svg" /> */}
                    {/* <div className="card links-list">
                        <button className="btn link-btn">
                            <RiProfileLine />
                            <label className="link-btn-title">Profile</label>
                        </button>
                        <button className="btn link-btn">
                            <IoPeopleCircle />
                            <label className="link-btn-title">Team Info</label>
                        </button>
                    </div> */}
                    
                {/* </div> */}
                
            </div>
        </div>
    );
};
 
export default UserInfo;