import React from "react";
import { Modal, Badge } from "react-bootstrap";
import { Form } from "react-bootstrap";

function SupervisedProjectSeeMore(props) {
    return (
        <>
            <Modal centered show={props.show} onHide={props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Project Details:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="editProject">
                        <Form.Group>
                            <Form.Label>Title: {props.title}</Form.Label>
                        </Form.Group>
                        <hr />
                        <Form.Group>
                            <Form.Label>
                                Students: <br></br>
                                {props.students.map((st, i) => (
                                    <Badge
                                        style={{
                                            color: "#00BFA6",
                                        }}
                                        className=" mb-1"
                                        key={i}
                                    >
                                        {st}
                                    </Badge>
                                ))}
                                {!props.students.length &&
                                    "No students working on this project"}
                            </Form.Label>
                        </Form.Group>
                        <hr />
                        <Form.Group>
                            <Form.Label>
                                Doctor Supervisor: <br></br>
                                {props.Dr.map((dr, i) => (
                                    <Badge
                                        style={{
                                            color: "#00BFA6",
                                        }}
                                        className=" mb-1"
                                        key={i}
                                    >
                                        {dr}
                                    </Badge>
                                ))}
                                {!props.Dr.length &&
                                    "No Dr. supervising this project"}
                            </Form.Label>
                        </Form.Group>
                        <hr />
                        <Form.Group>
                            <Form.Label>
                                TA Supervisor: <br></br>
                                {props.TA.map((ta, i) => (
                                    <Badge
                                        style={{
                                            color: "#00BFA6",
                                        }}
                                        className=" mb-1"
                                        key={i}
                                    >
                                        {ta}
                                    </Badge>
                                ))}
                                {!props.TA.length &&
                                    "No TA supervising this project"}
                            </Form.Label>
                        </Form.Group>
                        <hr />
                        <Form.Group>
                            <Form.Label>
                                Brief Description: <br></br>
                                {props.brief_description}
                            </Form.Label>
                        </Form.Group>
                        <hr />
                        <Form.Group>
                            <Form.Label>
                                Used Technologies: <br></br>
                                {props.tech.map((t, i) => (
                                    <Badge
                                        pill
                                        style={{
                                            color: "#00BFA6",
                                            borderColor: "#00BFA6",
                                            borderWidth: "1px",
                                            borderStyle: "solid",
                                        }}
                                        className=" mb-1"
                                        key={i}
                                    >
                                        {t}
                                    </Badge>
                                ))}
                                {!props.tech.length &&
                                    "No technologies provided"}
                            </Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SupervisedProjectSeeMore;
