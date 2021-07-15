import {Navbar} from "components/navbar";
import React from "react";
import "styles/stickey.css";
import {Redirect, Route, Switch} from "react-router";
import * as r from "routes/routes";
import * as pages from "../";
import {StaffSideBar} from "components/sidebar";



const DashboardPage = () => {
    const style = {
        // backgrounds from 1 to 5 i.e. feed_4
        backgroundImage: "url(/feed_7.svg)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
    };
    return (
        <div className="container-fluid h-100" style={style}>
             <div className="row">
                <div className="col">
                    <Navbar />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-3">
                    <div className="sidebar-item">
                        <div className="make-me-sticky">
                            <StaffSideBar />
                        </div>
                    </div>
                </div>
                 <div className="col-12 col-lg-9">
                    <Switch>
                        <Route exact path={r.staffDashboradRoute}>
                            <Redirect to={r.staffRequests} />
                        </Route>
                        
                        <Route path={r.staffProfileRoute}>
                            <pages.DoctorProfile />
                        </Route>
                        <Route path={r.staffProjects}>
                            <pages.StaffProjectsPage />
                        </Route>
                        {/* <Route path={r.showStudAllProjects}>
                            <pages.StaffAllProjectsPage />
                        </Route> */}
                        <Route
                            path={r.staffSupervisedProjectsRoute}
                            component={pages.SupervisedProjects}
                        />
                        <Route path={r.staffRequests}>
                            <pages.StaffRequests />
                        </Route>
                    </Switch>
                </div> 
            </div> 
        </div>
    );
};
export default DashboardPage;
