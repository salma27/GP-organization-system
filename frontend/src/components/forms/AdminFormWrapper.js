import React from "react";
import { LoginImg } from "utils";
import { Container, Row, Col } from "react-bootstrap";
import "./Login.css";
const style = {};
const AdminFormWrapper = ({ children }) => {
    return (
        <Container fluid id="login-container" style={style}>
            <Row id="form">
                <Col sm={12}>
                    <Container fluid id="loginForm">
                        {children}
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};
export default AdminFormWrapper;
