import { Button, Form, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import { BsButton } from "utils";
import "./MaxProjects.css";

function MaxProjects() {
    return (
        <>
            <Form className="w-100">
                <Row>
                    <Col>
                        <Form.Label>Maximum Projects: </Form.Label>
                    </Col>
                    <Col></Col>
                </Row>
                <div id="notesBtn" style={{ width: "200px" }}>
                    <Row>
                        <Col>
                            <BsButton size="sm" label="<" />
                        </Col>
                        <Col>
                            <label>0</label>
                        </Col>
                        <Col>
                            <BsButton size="sm" label=">" />
                        </Col>
                    </Row>
                </div>
                <Row>
                    <BsButton
                        size="sm"
                        label="See My Projects"
                        id="notesBtn"
                        width="300px"
                    />
                </Row>
            </Form>
        </>
    );
}

export default MaxProjects;
