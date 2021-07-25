import React from "react";
import { LoginImg, Select } from "utils";
import { Container, Row, Col } from "react-bootstrap";
import "./register.css";
import { useState } from "react";
import { BsButton } from "utils";
import { Form } from "react-bootstrap";
import { useRequest, useTechnology, useValidation } from "hooks";
import { useHistory, useParams } from "react-router";

import vest, { test, enforce } from "vest";
import { toast } from "react-toastify";
import { loginRouteWithEcom } from "routes/routes";

const registerValidations = vest.create("Register", (data, field) => {
    vest.only(field);
    ["password"].forEach((elem) => {
        test(elem, "This field is required", () => {
            enforce(data[elem].toString()).isNotEmpty();
        });
    });
    test("password", "Password should be at least 8 characters long", () => {
        enforce(data.password.toString()).longerThanOrEquals(8);
    });
});

const style = {
    // backgrounds from 1 to 5 i.e. feed_4
    backgroundImage: "url(/login.svg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
height: "100%"
};

const Register = ({ student, supervisor }) => {
    const [user, setUser] = useState({
        bio: "",
        password: "",
        teamsSlots: 0,
        technologies: [],
    });
    const { errors, validate, addErrors } = useValidation(registerValidations);
    const [studentRequest, requestingStudent] = useRequest((axios, data) =>
        axios.post("/student", data)
    );
    const [supervisorRequest, requestingSupervisor] = useRequest(
        (axios, data) => axios.post("/supervisor", data)
    );
    const history = useHistory();
    const [, , tech] = useTechnology();
    let { token: ecomToken } = useParams();
    const onChangeHandler = ({ target: { name, value } }) => {
        const newUser = { ...user, [name]: value };
        validate(newUser, name).catch((e) => {});
        setUser(newUser);
    };
    const onSelectHandler = ({ target: { name, value } }) => {
        const newUser = { ...user, [name]: value.map((v) => v.value) };
        setUser(newUser);
    };
    function submit(event) {
        event.preventDefault();
        validate(user)
            .then(() => {
                if (student)
                    studentRequest({ ...user, ecomToken })
                        .then((r) => {
                            const route = loginRouteWithEcom.replace(
                                ":ecomId",
                                r.data.ecomId
                            );
                            history.push(route);
                        })
                        .catch((e) => {
                            toast.error(e.response.data.message);
                        });
                else if (supervisor)
                    supervisorRequest({ ...user, ecomToken })
                        .then((r) => {
                            const route = loginRouteWithEcom.replace(
                                ":ecomId",
                                r.data.ecomId
                            );
                            history.push(route);
                        })
                        .catch((e) => {
                            toast.error(e.response.data.message);
                        });
            })
            .catch((e) => {});
    }
    //password
    //techs
    //bio
    //slots for supervisor
    return (
        <Container fluid id="login-container" style={style}>
            <Row id="form">
                <Col sm={12} className="centerImg">
                    <LoginImg id="img" />
                </Col>
                <Col sm={12}>
                    <Container fluid id="loginForm">
                        <Form onSubmit={submit}>
                            <Form.Group size="lg" controlId="password">
                                <Form.Label bsPrefix="text-lg mt-1">
                                    Password
                                </Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="password"
                                    name="password"
                                    placeholder="*****"
                                    value={user.password}
                                    onChange={onChangeHandler}
                                    isInvalid={errors.password}
                                />
                                {errors.password && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                )}
                                <Form.Label bsPrefix="text-lg mt-1">
                                    Bio
                                </Form.Label>
                                <Form.Control
                                    placeholder="Bio"
                                    name="bio"
                                    autoFocus
                                    type="text"
                                    value={user.bio}
                                    onChange={onChangeHandler}
                                    isInvalid={errors.bio}
                                />
                                <Form.Label bsPrefix="text-lg mt-1">
                                    Technologies
                                </Form.Label>
                                <Select
                                    name="technologies"
                                    options={tech}
                                    isMulti
                                    onChange={onSelectHandler}
                                    placeholder="Select Technologies you know"
                                />

                                {supervisor && (
                                    <>
                                        <Form.Label bsPrefix="text-lg mt-1">
                                            Available team slots
                                        </Form.Label>
                                        <Form.Control
                                            placeholder="Available team slots"
                                            name="teamsSlots"
                                            autoFocus
                                            type="text"
                                            value={user.teamsSlots}
                                            onChange={onChangeHandler}
                                            isInvalid={errors.teamsSlots}
                                        />
                                    </>
                                )}
                            </Form.Group>
                            <BsButton
                                size="lg"
                                type="submit"
                                id="loginBtn"
                                label={
                                    requestingStudent ||
                                    requestingSupervisor ? (
                                        <i className="fas fa-spinner fa-spin"></i>
                                    ) : (
                                        "Register"
                                    )
                                }
                            />
                        </Form>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};
export default Register;
