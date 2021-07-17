import React, { useState } from "react";
import { BsButton, TYPES } from "utils";
import { Form } from "react-bootstrap";
import "./Login.css";
import { useAuthContext, useRequest, useValidation } from "hooks";
import loginFormValidations from "./loginFormValidations";
import { adminLoginRequest } from "requests";
import { useHistory } from "react-router";
import { adminDashboard } from "routes/routes";
import { toast } from "react-toastify";

function AdminLoginForm() {
    const [user, setUser] = useState({ id: "", password: "" });
    const { errors, validate, addErrors } = useValidation(loginFormValidations);
    const [request, requesting] = useRequest(adminLoginRequest);
    const history = useHistory();
    const { setAuth } = useAuthContext();

    const onChangeHandler = ({ target: { name, value } }) => {
        const newUser = { ...user, [name]: value };
        validate(newUser, name).catch((e) => { });
        setUser(newUser);
    };
    function submit(event) {
        event.preventDefault();
        validate(user)
            .then(() => {
                request({ username: user.id, password: user.password })
                    .then((r) => {
                        console.log({...r});
                        setAuth({ access_token: r.data.token, is_logged_in: true, account_type: TYPES.ADMIN }); ///sureeee??????
                        history.push(adminDashboard);
                        // console.log(r.data);
                    })
                    .catch((e) => {
                        console.log(e);
                        const err = {
                            id: "Invalid id/password",
                            password: "Invalid id/password",
                        };
                        addErrors(err);
                        toast.error("Invalid username/password")
                    });
            })
            .catch((e) => { });
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
