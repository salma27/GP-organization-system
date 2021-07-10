import React from 'react';
import {Navbar} from "components/navbar";
import {PersonInfo,Technologies,Note} from "components/cards";
import "./../../../css/personInfoCard.css";
import {ProfileSidebar} from "components/sidebar";
import {IoPeopleCircle} from "react-icons/io5";
import {FaHandPointRight} from "react-icons/fa";
import {RiProfileLine} from "react-icons/ri";
import {Link, NavLink} from "react-router-dom"
import * as r from "routes/routes";

const style = {
    // backgrounds from 1 to 5 i.e. feed_4
    backgroundImage: "url(/feed_7.svg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    // height:"100vh",
};

const tech = ["ML", "Web development","AI"]

const UserInfo = () => {
    
    
    
    return (
        <div className="container-fluid" style={style}>
            <div className="row">
                <div className="col-12">
                    <Navbar />
                </div>
            </div>
            <div className="row" >
                {/* <figure className="figure col-2 mx-auto personImg">
                    <img src="\profile.svg" className="figure-img img-fluid rounded mx-auto " alt="..."/>
                    <figcaption className="figure-caption text-center">سهيل هاني محمد صلاح الدين محمد فوزي </figcaption>
                </figure> */}
                {/* ,paddingTop:"15%" */}
                <div className="col-12 col-lg-3">
                    <ProfileSidebar />
                </div>
                
                <div className="col-12 col-lg-7" >
                    {/* <div>
                        <button style={{width:"50%",backgroundColor:"green"}}>person information</button>
                        <button style={{width:"50%",backgroundColor:"green"}}>team information</button>
                    </div> */}
                    <PersonInfo />
                    <hr />
                    
                    <Technologies tech={tech} />
                    <hr />
                    <Note />
                    <hr />
                    <div className="left-link">
                        <Link to="/" className="personInfo-hidder link-btn w-auto">Go To Team <FaHandPointRight />
                        </Link>
                    </div>
                    
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