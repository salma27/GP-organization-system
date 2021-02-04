import "./App.css";
import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Login } from "../Login";
import { StudentProfile } from "../StudentProfile";
import { TeamProfile } from "../TeamProfile";

function App() {
    return (
        <>
            <div>
                <BrowserRouter>
                    <Link to="/home"> home | </Link>
                    <Link to="/login"> login | </Link>
                    <Link to="/studentProfile"> student Profile | </Link>
                    <Link to="/TeamProfile"> Team Profile | </Link>
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
                            <Route
                                path="/TeamProfile"
                                component={TeamProfile}
                            ></Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
