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
height: "100%"
    // height:"100vh",
};

const tech = ["ML", "Web development","AI"]

const UserInfo = (props) => {
const location = useLocation();
const { res, student } = location.state;
const id = res.ecomId;
const isStudent = student;
const show = props.show?props.show:false;
const btn = props.btn?props.btn:false;


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
                
                
                <div className="col-12 col-lg-12 m-auto" >
                    
                    <PersonInfo show={show} btn={btn} info={user} isStudent={isStudent}/>
                    <hr />
                    
                    <div className="personinfo-block">
                        <h5 className="personInfo-hidder w-fit-mb">Technologies </h5>
                        <Technologies tech={isStudent?user.technologyIds: user.technologies} />
                    </div>
                    <hr />
                    <Note note={user.bio}/>
                    
                    
                </div>
                
            </div>
        </div>
    );
};
 
export default UserInfo;