import React, { useState } from "react";
import "./Login.css";
import { ErrorHandlingInput, Title, Button } from "utils";
import SearchBar from "../SearchBar/SearchBar";
function LoginBox() {
    const [email, setEmail] = useState("example@gmail.com");
    const [password, setPassword] = useState("");
    const [star, setStar] = useState("");
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
                    label="Email"
                    labelID="email"
                    placeholder={email}
                    className="emailInput"
                    onChange={(e) => {
                        if (email === "example@gmail.com")
                            setEmail(e.target.value);
                        else setEmail(email + e.target.value);
                        console.log(e.target.value);
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
                    placeholder={star}
                    onChange={(e) => {
                        setPassword(password + e.target.value);
                        setStar(star + "*");
                    }}
                />
            </div>
            <br></br>
            <br></br>

            <Button
                type="submit"
                label="Login"
                height="30px"
                width="7rem"
                borderRadius="0.7rem"
                onClick={() => console.log(password)}
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
