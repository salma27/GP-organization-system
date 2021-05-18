import { Button, Form, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import { BsButton } from "utils";
import { useHistory } from "react-router-dom";
import supervisedProjects from "./supervisedProjects";

function MaxProjects() {
    const [max, setMax] = useState(0);
    const history = useHistory();

    const seeProjects = () => {
        let path = "./supervisedProjects";
        history.push(path);
    };
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
                            <BsButton
                                size="sm"
                                label="<"
                                onClick={() => {
                                    setMax(max > 0 ? max - 1 : 0);
                                }}
                            />
                        </Col>
                        <Col>
                            <label>{max}</label>
                        </Col>
                        <Col>
                            <BsButton
                                size="sm"
                                label=">"
                                onClick={() => {
                                    setMax(max < 5 ? max + 1 : 5);
                                }}
                            />
                        </Col>
                    </Row>
                </div>
                <Row>
                    <BsButton
                        size="sm"
                        label="See My Projects"
                        id="notesBtn"
                        width="300px"
                        onClick={seeProjects}
                    />
                </Row>
            </Form>
        </>
    );
}

export default MaxProjects;
