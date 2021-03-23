import React from "react";
import {LoginImg} from "utils";
import {Container, Row, Col} from "react-bootstrap";
import "./Login.css";

const FormWrapper = ({children}) => {
    return (
        <Container fluid id="login-container">
            <Row id="form">
                <Col sm={12} className="centerImg">
                    <LoginImg id="img" />
                </Col>
                <Col sm={12}>
                    <Container fluid id="loginForm">
                        {children}
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};
export default FormWrapper;
