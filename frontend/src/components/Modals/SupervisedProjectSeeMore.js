import React from "react";
import { Modal, Badge } from "react-bootstrap";
import { Form } from "react-bootstrap";

function SupervisedProjectSeeMore({show=false,hide=true,title="",students=[],Dr=[],TA=[],brief_description="",tech=[],showingStaff=true}) {
    return (
        <>
            <Modal centered show={show} onHide={hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Project Details:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="editProject">
                        <Form.Group>
                            <Form.Label>Title: {title}</Form.Label>
                        </Form.Group>
                        <hr />
                        <Form.Group>
                            <Form.Label>
                                Students: <br></br>
                                {students.map((st, i) => (
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
                                {!students.length &&
                                    "No students working on this project"}
                            </Form.Label>
                        </Form.Group>
                        <hr />
                        {showingStaff&&
                        <>
                        <Form.Group>
                            <Form.Label>
                                Doctor Supervisor: <br></br>
                                {Dr.map((dr, i) => (
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
                                {!Dr.length &&
                                    "No Dr. supervising this project"}
                            </Form.Label>
                        </Form.Group>
                        <hr />
                        <Form.Group>
                            <Form.Label>
                                TA Supervisor: <br></br>
                                {TA.map((ta, i) => (
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
                                {!TA.length &&
                                    "No TA supervising this project"}
                            </Form.Label>
                        </Form.Group>
                        <hr />
                        </>
}
                        <Form.Group>
                            <Form.Label>
                                Brief Description: <br></br>
                                {brief_description}
                            </Form.Label>
                        </Form.Group>
                        <hr />
                        <Form.Group>
                            <Form.Label>
                                Used Technologies: <br></br>
                                {tech.map((t, i) => (
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
                                {!tech.length &&
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
