import React from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {AdminRoutes, UserRoutes} from "routes";
import * as r from "routes/routes";
import "jquery";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
                <Links />
                <Switch>
                    <Route path={r.adminRoute} component={AdminRoutes} />
                    <Route path="/" component={UserRoutes} />
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
