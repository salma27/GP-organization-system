import React from "react";
import "./Login.css";
import { ErrorHandlingInput, Title } from "utils";

function LoginBox() {
    return (
        <div className="loginBox">
            <ErrorHandlingInput
                label="Email"
                placeholder="example@gmail.com"
                className="emailInput"
            />

            <ErrorHandlingInput
                label="Password"
                type="password"
                className="passwordInput"
            />
            <button type="submit">Login</button>
        </div>
    );
}

function Login() {
    return (
        <div className="loginPage">
            <Title orange="WELCOME!!" />
            <div>
                <LoginBox />
            </div>
        </div>
    );
}

export default Login;
