import React from "react";
import { Select } from "utils";
import { Container, Row, Col } from "react-bootstrap";
import "./register.css";
import { useState } from "react";
import { BsButton } from "utils";
import { Form } from "react-bootstrap";
import { useDepartments, useRequest } from "hooks";
import { useHistory } from "react-router";
import { studentRegisterRoute, supervisorRegisterRoute } from "routes/routes";
import { Link } from "react-router-dom";

const style = {
    // backgrounds from 1 to 5 i.e. feed_4
    backgroundImage: "url(/Hexagon.svg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    height: "100%",
};

const EcomMock = () => {
    const [user, setUser] = useState({
        ecomId: "",
        name: "",
        departmentId: "",
        type: "",
    });
    const [link, setLink] = useState("");
    const [studentRequest, requestingStudent] = useRequest((axios, data) =>
        axios.post("/student/ecom/encode-token", data)
    );
    const [supervisorRequest, requestingSupervisor] = useRequest(
        (axios, data) => axios.post("/supervisor/ecom/encode-token", data)
    );
    const history = useHistory();
    const [, , departments] = useDepartments();
    // console.log(departments);
    const userTypes = [
        { label: "Student", value: "st" },
        { label: "Teaching Assistant", value: "ta" },
        { label: "Doctor", value: "dr" },
    ];
    const onChangeHandler = ({ target: { name, value } }) => {
        const newUser = { ...user, [name]: value };
        setUser(newUser);
    };
    const onSelectHandler = ({ target: { name, value } }) => {
        const newUser = { ...user, [name]: value ? value.value : "" };
        setUser(newUser);
    };
    function submit(event) {
        event.preventDefault();
        if (user.type === "st")
            studentRequest(user)
                .then((r) => {
                    const token = r.data;
                    const route = studentRegisterRoute.replace(":token", token);
                    setLink(route);
                })
                .catch(() => {});
        else
            supervisorRequest(user)
                .then((r) => {
                    const token = r.data;
                    const route = supervisorRegisterRoute.replace(
                        ":token",
                        token
                    );
                    setLink(route);
                })
                .catch(() => {});
    }

    return (
        <Container fluid id="mock-container" style={style}>
            <Row id="mock-form">
                <Col sm={12}>
                    <Container fluid id="mockForm">
                        <Form onSubmit={submit}>
                            <Form.Group size="lg" controlId="id">
                                <Form.Label>Ecom ID</Form.Label>
                                <Form.Control
                                    placeholder="Ecom ID"
                                    name="ecomId"
                                    autoFocus
                                    type="text"
                                    value={user.ecomId}
                                    onChange={onChangeHandler}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="password">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="text"
                                    name="name"
                                    placeholder="User name"
                                    value={user.name}
                                    onChange={onChangeHandler}
                                />
                            </Form.Group>
                            <Form.Group size="lg">
                                <Form.Label>Department</Form.Label>
                                <Select
                                    name="departmentId"
                                    options={departments}
                                    onChange={onSelectHandler}
                                    placeholder="Select a department"
                                />
                            </Form.Group>
                            <Form.Group size="lg">
                                <Form.Label>User type</Form.Label>
                                <Select
                                    name="type"
                                    options={userTypes}
                                    onChange={onSelectHandler}
                                    placeholder="Select user type"
                                />
                            </Form.Group>
                            <BsButton
                                size="lg"
                                type="submit"
                                id="mockBtn"
                                label={
                                    requestingStudent ||
                                    requestingSupervisor ? (
                                        <i className="fas fa-spinner fa-spin"></i>
                                    ) : (
                                        "Generate register link"
                                    )
                                }
                            />
                        </Form>
                        <div className="ecom-link">
                            {link.length ? (
                                <Link to={link} className="link-danger">
                                    {link}
                                </Link>
                            ) : (
                                "no link yet"
                            )}
                        </div>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};
export default EcomMock;
