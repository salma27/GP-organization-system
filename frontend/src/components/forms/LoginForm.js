import React, { useState } from "react";
import { BsButton, TYPES } from "utils";
import { Form, Checkbox } from "react-bootstrap";
import "./Login.css";
import { useAuthContext, useRequest, useValidation } from "hooks";
import loginFormValidations from "./loginFormValidations";
import { loginRequests } from "requests";
import { useHistory, useParams } from "react-router";
import {
    studentDashboardRoute,
    staffDashboradRoute,
    staffBase,
    staffProfileRoute,
} from "routes/routes";
import { toast } from "react-toastify";

function LoginForm(props) {
    const { ecomId } = useParams();
    const [user, setUser] = useState({
        id: ecomId ? ecomId : "",
        password: "",
    });
    const [isStudent, setIsStudent] = useState(false);
    const { errors, validate, addErrors } = useValidation(loginFormValidations);
    const [request, requesting] = useRequest(loginRequests);
    const history = useHistory();
    const { setAuth } = useAuthContext();
    console.log(ecomId);
    const onChangeHandler = ({ target: { name, value } }) => {
        const newUser = { ...user, [name]: value };
        validate(newUser, name).catch((e) => {});
        setUser(newUser);
    };
    function submit(event) {
        event.preventDefault();
        validate(user)
            .then(() => {
                request({
                    ecomId: user.id,
                    password: user.password,
                    type: isStudent ? TYPES.STUDENT : TYPES.STAFF,
                })
                    .then((r) => {
                        setAuth({
                            access_token: r.data.token,
                            is_logged_in: true,
                            account_type: isStudent
                                ? TYPES.STUDENT
                                : TYPES.STAFF,
                        });
                        if (isStudent) history.push("/student/dashboard");
                        else history.push("/staff/dashboard");
                    })
                    .catch(({ response }) => {
                        toast.error(response.data.message);
                        toast.error("Invalid ID/Password");
                    });
            })
            .catch(({ response }) => {
                toast.error(response.data.message);
            });
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
                <Form.Group size="lg" controlId="isStudent">
                    <div class="container w-100 text-center">
                        <h4>
                            <input
                                type="checkbox"
                                id="isStudent"
                                className="mr-2"
                                onClick={() => {
                                    setIsStudent(!isStudent);
                                }}
                            ></input>
                            Student?
                        </h4>
                    </div>
                </Form.Group>
                <BsButton size="lg" type="submit" id="loginBtn" label="Login" />
            </Form>
        </>
    );
}

export default LoginForm;
