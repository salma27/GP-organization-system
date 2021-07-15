import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as r from "./routes";
import * as pages from "components/pages";
import PrivateRoute from "./PrivateRoute";

const style = {
    // backgrounds from 1 to 5 i.e. feed_4
    backgroundImage: "url(/Hexagon.svg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
};

const AdminRoutes = () => {
    return (
        <div style={style}>
            <Switch>
                <Route exact path={r.adminRoute}>
                    <Redirect to={r.adminDashboard} />
                </Route>
                <Route
                    exact
                    path={r.adminLoginRoute}
                    component={pages.AdminLoginPage}
                />
                <Route
                    exact
                    path={r.adminDashboard}
                    component={pages.AdminDashboard}
                />
                {/*<PrivateRoute
                    admin
                    path={r.adminDashboard}
                    component={pages.AdminDashboard}
                />*/}

                <Route path={r.adminRules} component={pages.AdminRules} />
                <Route
                    path={r.studentsDataTable}
                    component={pages.StudentsTablePage}
                />
                <Route
                    path={r.doctorsDataTable}
                    component={pages.DoctorsTablePage}
                />
                <Route
                    path={r.teamsDataTable}
                    component={pages.TeamTablePage}
                />
                <Route path={r.taDataTable} component={pages.TATablePage} />
                <Route
                    path="*"
                    render={({ staticContext }) => {
                        if (staticContext) staticContext.statusCode = 404;
                        return <pages.NotFound />;
                    }}
                />
            </Switch>
        </div>
    );
};
export default AdminRoutes;
