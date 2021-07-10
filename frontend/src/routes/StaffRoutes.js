import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as r from "./routes";
import * as pages from "components/pages";

const StaffRoutes = () => {
    return (
        <>
            <Switch>
                {/* <Route exact path={r.staffBase} >
                <div>staff route</div> 
                </Route> */}
            
                <Route
                    path={r.staffDashboradRoute} 
                    component={pages.StaffDashboardPage}
                />
                <Route
                    path={r.staffProfileRoute}
                    component={pages.DoctorProfile}
                />
                <Route
                    path={r.staffSupervisedProjectsRoute}
                    component={pages.SupervisedProjects}
                />
                

               
            </Switch>
        </>
    );
};
export default StaffRoutes;
