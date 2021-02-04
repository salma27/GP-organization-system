import React from "react";
import { Form, Col, Row } from "react-bootstrap";

function TeamMembers() {
    return (
        <>
            <Form>
                <div>Team Members: </div>
                <Form.Row>
                    <Col md={4} lg={4} sm={2}>
                        <Form.Label>1. </Form.Label>
                    </Col>
                    <Col md={6} lg={6} sm={8}>
                        <Form.Control disabled />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col md={4} lg={4} sm={2}>
                        <Form.Label>2. </Form.Label>
                    </Col>
                    <Col md={6} lg={6} sm={8}>
                        <Form.Control disabled />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col md={4} lg={4} sm={2}>
                        <Form.Label>3. </Form.Label>
                    </Col>
                    <Col md={6} lg={6} sm={8}>
                        <Form.Control disabled />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col md={4} lg={4} sm={2}>
                        <Form.Label>4. </Form.Label>
                    </Col>
                    <Col md={6} lg={6} sm={8}>
                        <Form.Control disabled />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col md={4} lg={4} sm={2}>
                        <Form.Label>5. </Form.Label>
                    </Col>
                    <Col md={6} lg={6} sm={8}>
                        <Form.Control disabled />
                    </Col>
                </Form.Row>
                <div>Supervisors:</div>
                <Form.Row>
                    <Col md={4} lg={4} sm={2}>
                        <Form.Label>1. </Form.Label>
                    </Col>
                    <Col md={6} lg={6} sm={8}>
                        <Form.Control disabled />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col md={4} lg={4} sm={2}>
                        <Form.Label>2. </Form.Label>
                    </Col>
                    <Col md={6} lg={6} sm={8}>
                        <Form.Control disabled />
                    </Col>
                </Form.Row>
                <div>Teacher Assisstant: </div>
                <Form.Row>
                    <Col md={4} lg={4} sm={2}>
                        <Form.Label>1. </Form.Label>
                    </Col>
                    <Col md={6} lg={6} sm={8}>
                        <Form.Control disabled />
                    </Col>
                </Form.Row>
            </Form>
        </>
    );
}

export default TeamMembers;
