import "./App.css";
import React from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {Login} from "components/Login";
import {StudentProfile} from "components/StudentProfile";

function App() {
    return (
        <>
            <div>
                <BrowserRouter>
                    <Link to="/home"> home | </Link>
                    <Link to="/login"> login | </Link>
                    <Link to="/studentProfile"> student Profile | </Link>
                    <div>
                        <Switch>
                            <Route path="/home">
                                <div>you're in home</div>
                            </Route>
                            <Route path="/login" component={Login}></Route>
                            <Route
                                path="/StudentProfile"
                                component={StudentProfile}
                            ></Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
