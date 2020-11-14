import React from "react";
import "./Login.css";
//import Title from "../StudentProfile/Title";

function Email(props) {
    return (
        <div id="emailDiv">
            Email:
            <input placeholder="example@gmail.com" id="emailInput" />
        </div>
    );
}

function Password(props) {
    return (
        <div id="passwordDiv">
            Password:
            <input type="password" id="passwordInput" />
        </div>
    );
}

function LoginBox() {
    return (
        <div className="loginBox">
            <Email />
            <Password />
            <button type="submit">Login</button>
        </div>
    );
}

function Login() {
    return (
        <>
            <div className="loginPage">
                <LoginBox />
            </div>
        </>
    );
}

export default Login;
