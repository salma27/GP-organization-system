import { Button, Form, Col, Row } from "react-bootstrap";
import React, { useState, useCallback } from "react";
import { BsButton } from "utils";
import { useHistory, Link, BrowserRouter } from "react-router-dom";
import * as r from "routes/routes";

function MaxProjects() {
    const [max, setMax] = useState(0);
    const history = useHistory();

    const seeProjects = () => {
        let path = r.supervisedProjectsRoute;
        history.replace(path);
    };
    const inc = useCallback(() => {
        if (max < 5) setMax(max + 1);
        else setMax(5);
    }, []);

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
                            <BsButton size="sm" label=">" onClick={inc} />
                        </Col>
                    </Row>
                </div>
                <Row>
                    {/*<Link to={r.supervisedProjectsRoute}>
                        <BsButton
                            size="sm"
                            label="See My Projects"
                            id="notesBtn"
                            width="300px"
                            onClick={seeProjects}
                        />
                    </Link>
                    {/*<BrowserRouter>
                        <button>
                            <Link to="/abc" target="_blank">
                                {" "}
                                Me{" "}
                            </Link>
                        </button>
                    </BrowserRouter>
                    */}
                    {/** <Link to={"/supervisedProjects"}>
                        <button> Click Me </button>
                    </Link>
                    <button
                        type="submit"
                        size="lg"
                        variant="secondary"
                        block="block"
                        onClick={seeProjects}
                    >
                        See
                    </button>
                    <Button>
                        <a type="button" className>
                            See My Projects
                        </a>
                    </Button>
                    <a
                        target="supervisedProjects"
                        type="button"
                        size="sm"
                        label="See My Projects"
                        id="notesBtn"
                        width="300px"
                        //onClick={seeProjects}
                    >
                        See My Projects
                    </a>
                    */}
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
