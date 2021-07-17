import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { AdminRoutes, UserRoutes } from "routes";
import { ToastContainer } from "react-toastify";
import * as r from "routes/routes";
import StaffRoutes from "routes/StaffRoutes";
import "./App.css";

import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "bootstrap/dist/css/bootstrap.css";
import "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "bootstrap";
import "@popperjs/core";

const Links = () => (
    <div>
        <Link to={r.root}> home </Link>
        <br />
        <Link to={r.loginRoute}> login </Link>
        <br />
        <Link to={r.studentProfileRoute}> student profile </Link>
        <br />
    </div>
);

function App() {
    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                {/* <Links /> */}
                <Switch>
                    <Route path={r.adminRoute} component={AdminRoutes} />
                    <Route path={r.staffBase} component={StaffRoutes} />
                    <Route path="/" component={UserRoutes} />
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
