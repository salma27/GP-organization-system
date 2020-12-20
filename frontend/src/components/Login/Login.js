import React, { useState } from "react";
import "./Login.css";
import { ErrorHandlingInput, Title, Button } from "utils";
import SearchBar from "../SearchBar/SearchBar";
function LoginBox() {
    const [email, setEmail] = useState("example@gmail.com");
    const [password, setPassword] = useState("");
    return (
        <div className="loginBox">
            <p
                style={{
                    fontSize: "32px",
                    paddingTop: "20px",
                    fontStyle: "bold",
                }}
            >
                Login
            </p>

            <div>
                <ErrorHandlingInput
                    type="text"
                    label="Email"
                    labelID="email"
                    value={email}
                    className="emailInput"
                    onClick={() => {
                        if (email === "example@gmail.com") setEmail("");
                    }}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </div>
            <br></br>
            <br></br>
            <div>
                <ErrorHandlingInput
                    label="Password"
                    labelID="password"
                    type="password"
                    className="passwordInput"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </div>
            <br></br>
            <br></br>

            <Button
                type="submit"
                label="Login"
                height="10%"
                width="15%"
                borderRadius="0.7rem"
            />
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
