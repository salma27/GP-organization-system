import React from "react";
import "./Login.css";
import { ErrorHandlingInput, Title, Button } from "utils";
import SearchBar from "../SearchBar/SearchBar";
function LoginBox() {
    return (
        <div className="loginBox">
            <div>
                <ErrorHandlingInput
                    label="Email"
                    labelID="email"
                    placeholder="example@gmail.com"
                    className="emailInput"
                    onChange={(e) => {
                        console.log(e.target.value);
                    }}
                />
            </div>
            <div>
                <ErrorHandlingInput
                    label="Password"
                    labelID="password"
                    type="password"
                    className="passwordInput"
                />
            </div>

            <Button
                type="submit"
                label="Login"
                height="30px"
                width="7rem"
                borderRadius="0.7rem"
            />
        </div>
    );
}

function Login() {
    return (
        <div className="loginPage">
            <SearchBar />
            <Title orange="WELCOME!!" />
            <div>
                <LoginBox />
            </div>
        </div>
    );
}

export default Login;
