import React from "react";
import { FaUser, FaPen, FaMailBulk, FaPlus, FaMinus } from "react-icons/fa";
import "./BasicInfo.css";
import { ErrorHandlingInput } from "utils";
import { Form, Row, Col } from "react-bootstrap";

function BasicInfo() {
    return (
        <>
            <Form>
                <Form.Row>
                    <Col md={4} lg={4} sm={2}>
                        <Form.Label>Name: </Form.Label>
                    </Col>
                    <Col md={6} lg={6} sm={8}>
                        <Form.Control disabled />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col md={4} lg={4} sm={2}>
                        <Form.Label>ID: </Form.Label>
                    </Col>
                    <Col md={6} lg={6} sm={8}>
                        <Form.Control disabled />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col md={4} lg={4} sm={2}>
                        <Form.Label>FCAI Mail: </Form.Label>
                    </Col>
                    <Col md={6} lg={6} sm={8}>
                        <Form.Control disabled />
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col md={4} lg={4} sm={2}>
                        <Form.Label>Department: </Form.Label>
                    </Col>
                    <Col md={6} lg={6} sm={8}>
                        <Form.Control disabled />
                    </Col>
                </Form.Row>
            </Form>
        </>
    );
}

export default BasicInfo;

/*
import React from "react";
import { FaUser, FaPen, FaMailBulk, FaPlus, FaMinus } from "react-icons/fa";
import "./BasicInfo.css";
import { ErrorHandlingInput } from "utils";
function BasicInfo() {
    return (
        <div>
            <table id="personalInfoTable">
                <tr>
                    <td>
                        <FaUser id="icon" />
                    </td>
                    <td>
                        <span id="name">Name:</span>
                    </td>
                    <td>
                        <ErrorHandlingInput id="personalInfo" readOnly="true" />{" "}
                    </td>
                </tr>
                <tr>
                    <td>
                        <FaPen id="icon" />{" "}
                    </td>
                    <td>
                        <span id="id">ID:</span>{" "}
                    </td>
                    <td>
                        <ErrorHandlingInput id="personalInfo" readOnly="true" />{" "}
                    </td>
                </tr>
                <tr>
                    <td>
                        <FaMailBulk id="icon" />
                    </td>
                    <td>
                        <span id="mail">FCAI Mail:</span>
                    </td>
                    <td>
                        <ErrorHandlingInput id="personalInfo" readOnly="true" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <FaPlus id="icon" />
                    </td>
                    <td>
                        <span id="major">Major:</span>
                    </td>
                    <td>
                        <ErrorHandlingInput id="personalInfo" readOnly="true" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <FaMinus id="icon" />
                    </td>
                    <td>
                        <span id="minor">Minor:</span>
                    </td>
                    <td>
                        <ErrorHandlingInput id="personalInfo" readOnly="true" />
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default BasicInfo;
*/
