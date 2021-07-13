import React from 'react';
import "./../../css/personInfoCard.css"

const PersonInfo = ({show=false}) => {
    return ( 
        // <div className="personInfoCard row">
        //     <figure className="figure col-12 personImg ">
        //         <img src="\profile.svg" className="figure-img img-fluid rounded mx-auto " alt="..."/>
        //         <figcaption className="figure-caption text-center">Sarah Saeed Ibrahim Rofail</figcaption>
        //     </figure>
        // </div>
        <div className="personinfo-block" >
            <div className="row container">
                {/* <div className="col-2"> */}
                    {/* <figure className="figure col-12 ">
                       <img src="\profile.svg" className="figure-img img-fluid rounded mx-auto " alt="..."/>
                       {/* <figcaption className="figure-caption text-center">Sarah Saeed Ibrahim Rofail</figcaption> 
                   </figure> */}
                   
                {/* </div> */}
                <div className="col-12 col-lg-3 " style={{}}>
                    <img src="\profile.svg" className=" mw-100 mh-100"/>
                </div>
                <div className="col-12 col-lg-9 personinfo-body" style={{}}>
                    <div className="personInfo row">
                        <div className="col-12 col-lg-3 mb-1">
                            <label className="personInfo-hidder">Name</label>
                        </div>
                        <div className="col-12 col-lg-9">
                            <p className="personInfo-second-text">Sarah Saeed Ibrahim Rofail Sarah Saeed Ibrahim Rofail Sarah Saeed Ibrahim Rofail</p>
                        </div>
                    </div>
                    <div className="personInfo row">
                        <div className="col-12 col-lg-3 mb-1">
                            <label className="personInfo-hidder">Email</label>
                        </div>
                        <div className="col-12 col-lg-9">
                            <p className="personInfo-second-text"> sara.said1998@gmail.com</p>
                        </div>
                    </div>
                    <div className="personInfo row ">
                        <div className="col-12 col-lg-3 mb-1">
                            <label className="personInfo-hidder">Department</label>
                        </div>
                        <div className="col-12 col-lg-2">
                            <p className="personInfo-second-text">CS</p>
                        </div>
                        {show && (
                            <>
                                <div className="col-12 col-lg-4 mb-1">
                                    <label className="personInfo-hidder">Number Of Teams</label>
                                </div>
                                <div className="col-12 col-lg-3">
                                    <p className="personInfo-second-text">5</p>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="personInfo row ">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default PersonInfo;