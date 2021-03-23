import {SideBar} from "components/sidebar";
import React from "react";
import {Redirect, Route, Switch} from "react-router";
import * as r from "routes/routes";
import * as pages from "./";

const DashboardTabs = () => {
    return (
        <>
            <SideBar>
                <Switch>
                    <Route exact path={r.dashboardRoute}>
                        {/* <Redirect to={r.studentTeamRoute} /> */}
                        <div>dashb zeft</div>
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
            </SideBar>
        </>
    );
};
export default DashboardTabs;
