import React from "react";
import "./BasicInfo.css";
import {Form, Col} from "react-bootstrap";

function BasicInfo() {
    return (
        <>
            <Form>
                <Form.Row>
                    <Col md={4} lg={4} sm={2}>
                        <Form.Label>Name: </Form.Label>
                    </Col>
                    <Col md={6} lg={6} sm={8}>
                        <Form.Control disabled />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col md={4} lg={4} sm={2}>
                        <Form.Label>ID: </Form.Label>
                    </Col>
                    <Col md={6} lg={6} sm={8}>
                        <Form.Control disabled />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col md={4} lg={4} sm={2}>
                        <Form.Label>FCAI Mail: </Form.Label>
                    </Col>
                    <Col md={6} lg={6} sm={8}>
                        <Form.Control disabled />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col md={4} lg={4} sm={2}>
                        <Form.Label>Department: </Form.Label>
                    </Col>
                    <Col md={6} lg={6} sm={8}>
                        <Form.Control disabled />
                    </Col>
                </Form.Row>
            </Form>
        </>
    );
}

export default BasicInfo;
