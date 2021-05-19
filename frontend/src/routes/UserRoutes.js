import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
// import PrivateRoute from "./PrivateRoute";
import * as r from "./routes";
import * as pages from "components/pages";

const UserRoutes = () => {
    return (
        <>
            <Switch>
                {/* <Route exact path={r.root}>
                    <Redirect to={r.dashboardRoute} />
                </Route> */}
                <Route exact path={r.root}>
                    <pages.LoginPage />
                </Route>
                <Route path={r.loginRoute}>
                    <pages.LoginPage />
                </Route>
                <Route
                    // <PrivateRoute
                    // user
                    path={r.dashboardRoute}
                    component={pages.DashboardTabs}
                />
                {/* <Route
                    user
                    path={r.studentProfileRoute}
                    component={pages.StudentProfilePage}
                /> */}
                <Route path={r.newsFeedRoute} component={pages.NewsFeedPage} />
                <Route
                    path={r.oldProjectsRoute}
                    component={pages.OldProjectsPage}
                />
                <Route
                    path="*"
                    render={({staticContext}) => {
                        if (staticContext) staticContext.statusCode = 404;
                        return (
                            <>
                                {/* <Title title="404 - page not found" /> */}
                                <pages.NotFound />
                            </>
                        );
                    }}
                />
            </Switch>
        </>
    );
};

export default UserRoutes;
