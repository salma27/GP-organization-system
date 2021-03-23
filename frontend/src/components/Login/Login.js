import React, {useState} from "react";
import {BsButton, LoginImg} from "utils";
import {Container, Row, Col, Form} from "react-bootstrap";
import "./Login.css";
function Login() {
    const [id, setID] = useState("");
    const [email, setEmail] = useState("");

    function validateForm() {
        return email.length > 0 && id.length > 7;
    }

    function submit(event) {
        event.preventDefault();
    }

    return (
        <>
            <Container fluid id="login-container">
                <Row id="form">
                    <Col sm={12} className="centerImg">
                        <LoginImg id="img" />
                    </Col>

                    <Col sm={12}>
                        <Container fluid id="loginForm">
                            <Form onSubmit={submit}>
                                <Form.Group size="lg" controlId="id">
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control
                                        placeholder="20--0---"
                                        autoFocus
                                        type="number"
                                        value={id}
                                        onChange={(e) => setID(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group size="lg" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="email"
                                        placeholder="example@stud.fci-cu.edu.eg"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                <BsButton
                                    size="lg"
                                    type="submit"
                                    disabled={!validateForm()}
                                    id="loginBtn"
                                    label="Login"
                                />
                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Login;

/*
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
*/
