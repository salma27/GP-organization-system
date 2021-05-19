import React from 'react';
import "./../../css/personInfoCard.css";
import {FaHandPointRight} from "react-icons/fa";
import {RiProfileLine} from "react-icons/ri";
import {Link} from "react-router-dom"

const PersonInfo = () => {
    return ( 
        // <div className="personInfoCard row">
        //     <figure className="figure col-12 personImg ">
        //         <img src="\profile.svg" className="figure-img img-fluid rounded mx-auto " alt="..."/>
        //         <figcaption className="figure-caption text-center">Sarah Saeed Ibrahim Rofail</figcaption>
        //     </figure>
        // </div>
        <div className="personinfo-block" >
            {/* <h5 className="personInfo-hidder w-fit-mb">Person Information</h5>
            <hr/> */}
            <div className="row container">
                {/* <div className="col-2"> */}
                    {/* <figure className="figure col-12 ">
                       <img src="\profile.svg" className="figure-img img-fluid rounded mx-auto " alt="..."/>
                       {/* <figcaption className="figure-caption text-center">Sarah Saeed Ibrahim Rofail</figcaption> 
                   </figure> */}
                   
                {/* </div> */}
                <div className="col-12 col-lg-3 " style={{}}>
                    <img src="\profile.svg" className="  mh-100" style={{maxWidth:"80%"}}/>
                    {/* <Link to="/" className="personInfo-hidder link-btn w-auto">Go To Team <FaHandPointRight />
                        </Link> */}
                </div>
                <div className="col-12 col-lg-9 personinfo-body" style={{}}>
                    <div className="personInfo row">
                        {/* <div className="col-7 col-lg-3 ">
                            <label className="personInfo-hidder">Name</label>
                        </div> */}
                        <div className="col-12 col-lg-9">
                            <p className="personInfo-second-text">Sarah Saeed Ibrahim Rofail</p>
                        </div>
                    </div>
                    <div className="personInfo row mt-2 mb-2">
                        {/* <div className="col-7 col-lg-3 ">
                            <label className="personInfo-hidder">Email</label>
                        </div> */}
                        <div className="col-12 col-lg-9">
                            <p className="personInfo-second-text"> sara.said1998@gmail.com</p>
                        </div>
                    </div>
                    <div className="personInfo row ">
                        {/* <div className="col-7 col-lg-3 mb-1">
                            <label className="personInfo-hidder">Department</label>
                        </div> */}
                        <div className="col-12 col-lg-3">
                            <p className="personInfo-second-text">CS</p>
                        </div>
                        {/* <div className="col-7 col-lg-3 mb-1">
                            <label className="personInfo-hidder">ID</label>
                        </div> */}
                        <div className="col-12 col-lg-3">
                            <p className="personInfo-second-text">20170111</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default PersonInfo;