import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as r from "./routes";
import * as pages from "components/pages";
import PrivateRoute from "./PrivateRoute";

const AdminRoutes = () => {
    return (
        <>
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
                <Route
                    path="*"
                    render={({ staticContext }) => {
                        if (staticContext) staticContext.statusCode = 404;
                        return <pages.NotFound />;
                    }}
                />
            </Switch>
        </>
    );
};
export default AdminRoutes;
