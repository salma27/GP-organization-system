import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
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
                <Route path={r.loginRouteWithEcom}>
                    <pages.LoginPage />
                </Route>
                <Route path={r.loginRoute}>
                    <pages.LoginPage />
                </Route>
                <Route
                    // <PrivateRoute
                    // user
                    path={r.studentDashboardRoute}
                    component={pages.DashboardTabs}
                />
                {/* <Route
                    user
                    path={r.studentProfileRoute}
                    component={pages.StudentProfilePage}
                /> */}
                <Route path={r.newsFeedRoute} component={pages.NewsFeedPage} />
                <Route path={r.search} exact component={pages.SearchResult} />
                <Route path={r.userInfo} exact component={pages.Info} />
                <Route path={r.staffInfo} exact component={pages.InfoStaff} />
                <Route path={r.showStaffProjects} component={pages.ShowStaffProjects} />
                {/* <Route path={r.projects} component={pages.Projects} />
                <Route path={r.teamInfo} component={pages.ShowingTeam} /> */}
                <Route path={r.SearchResult} component={pages.SearchResult} />
                <Route path={r.teamInfo} component={pages.TeamInfo} />
                
                <Route path={r.showStudAllProjects} component={pages.StaffAllProjectsPage} />

                <Route
                    path={r.oldProjectsRoute}
                    component={pages.OldProjectsPage}
                />
                <Route
                    path="*"
                    render={({ staticContext }) => {
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
