import React, { useState } from "react";
import { BsButton } from "utils";
import { Form } from "react-bootstrap";
import "./Login.css";
import { useAuthContext, useRequest, useValidation } from "hooks";
import loginFormValidations from "./loginFormValidations";
import { loginRequests } from "requests";
import { useHistory } from "react-router";
import { adminDashboard } from "routes/routes";

function AdminLoginForm() {
    const [user, setUser] = useState({ id: "", password: "" });
    const { errors, validate, addErrors } = useValidation(loginFormValidations);
    const [request, requesting] = useRequest(loginRequests);
    const history = useHistory();
    const [, setAuth] = useAuthContext();

    const onChangeHandler = ({ target: { name, value } }) => {
        const newUser = { ...user, [name]: value };
        validate(newUser, name).catch((e) => {});
        setUser(newUser);
    };
    function submit(event) {
        event.preventDefault();
        validate(user)
            .then(() => {
                request(user)
                    .then((r) => {
                        setAuth({ ...r.data.admin }); ///sureeee??????
                        history.push(adminDashboard);
                        // console.log(r.data);
                    })
                    .catch((e) => {
                        const err = {
                            id: "Invalid id/password",
                            password: "Invalid id/password",
                        };
                        addErrors(err);
                    });
            })
            .catch((e) => {});
    }

    return (
        <>
            <Form onSubmit={submit}>
                <Form.Group size="lg" controlId="id">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        placeholder="ID"
                        name="id"
                        autoFocus
                        type="text"
                        value={user.id}
                        onChange={onChangeHandler}
                        isInvalid={errors.id}
                    />
                    {errors.id && (
                        <Form.Control.Feedback type="invalid">
                            {errors.id}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
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
                </Form.Group>
                <BsButton size="lg" type="submit" id="loginBtn" label="Login" />
            </Form>
        </>
    );
}

export default AdminLoginForm;
