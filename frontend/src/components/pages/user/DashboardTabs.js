import {Navbar} from "components/navbar";
import {ProfileSidebar} from "components/sidebar";
import React from "react";
import "styles/stickey.css";
import {Redirect, Route, Switch} from "react-router";
import * as r from "routes/routes";
import * as pages from "./";

const DashboardTabs = () => {
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
                            <ProfileSidebar />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-9">
                    <Switch>
                        <Route exact path={r.dashboardRoute}>
                            <Redirect to={r.studentRequestsRoute} />
                            {/* <div>dashb zeft</div> */}
                        </Route>
                        <Route path={r.studentTeamRoute}>
                            <pages.StudentTeamPage />
                        </Route>
                        <Route path={r.studentRequestsRoute}>
                            <pages.StudentRequestsPage />
                        </Route>
                        <Route path={r.studentProjectsRoute}>
                            <pages.StudentProjectsPage />
                        </Route>
                        <Route path={r.studentProfileRoute}>
                            <pages.StudentProfilePage />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};
export default DashboardTabs;
