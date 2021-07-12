import React from 'react';
import {Navbar} from "components/navbar";
import * as pages from "./"
const style = {
    // backgrounds from 1 to 5 i.e. feed_4
    backgroundImage: "url(/feed_7.svg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    // height:"100vh",
};

const Info = () => {
    return ( 
        <div className="container-fluid" style={style}>
            <div className="row">
                <div className="col-12">
                    <Navbar />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-7 m-auto">
                    {/* <nav>
                        <div class="row nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="col-4 info-tab nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
                            <a class="col-4 info-tab nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</a>
                            <a class="col-4 info-tab nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</a>
                        </div>
                    </nav> */}
                    <ul className="row nav nav-tabs" id="myTab" role="tablist">
                        <li className="col-4 nav-item" role="presentation">
                            <button className="nav-link active info-tab" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Profile</button>
                        </li>
                        <li class="col-4 nav-item" role="presentation">
                            <button className="nav-link info-tab" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Team</button>
                        </li>
                        <li class="col-4 nav-item" role="presentation">
                            <button className="nav-link info-tab" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Projects</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <pages.UserInfo />
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <pages.ShowingTeam />
                        </div>
                        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                            <pages.Projects />
                        </div>
                    </div>
                    {/* <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            <pages.UserInfo />
                        </div>
                        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                            <pages.ShowingTeam />
                        </div>
                        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                            <pages.Projects />
                        </div>
                    </div> */}
                </div>
            </div>
            
            
        </div>
    );
}
 
export default Info;