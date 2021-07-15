import React, { useRef, useState } from "react";
import { Modal, Badge } from "react-bootstrap";
import { Editable, BsButton } from "utils";
import FieldsOfExperience from "../StudentProfile/FieldsOfExperience";
import "../StudentProfile/FieldsOfExperience.css";
import { Button, Form, Table, Col, Row, Container } from "react-bootstrap";
import suite from "./EditProjectValidations";
import { useAuthContext, useRequest, useValidation } from "hooks";
import EditProjectValidations from "./EditProjectValidations";

function AddDatatableRow(props) {
    const [newRow, setNewRow] = useState({});
    const departments = ["CS", "IS", "IT", "DS"];

    const { errors, validate } = useValidation(EditProjectValidations);
    const handleChange = ({ target: { name, value } }) => {
        validate({ ...newRow, [name]: value }, name).catch((e) => {});
        setNewRow({ ...newRow, [name]: value });
    };
    const selectDepartment = ({ target: { name, value } }) => {
        if (value !== "-1") setNewRow({ ...newRow, [name]: value });
        console.log(newRow);
    };

    return (
        <>
            <Modal centered show={props.show} onHide={props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Row</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="addRow">
                        {props.columns.map((r, i) =>
                            r.name === "Major" ||
                            r.name === "Department" ||
                            r.name === "major" ||
                            r.name === "department" ? (
                                <>
                                    <Form.Group>
                                        <label>{r.name}</label>
                                        <Form.Control
                                            as="select"
                                            name={r.name}
                                            onChange={selectDepartment}
                                        >
                                            <option
                                                value="-1"
                                                id="list"
                                            ></option>

                                            {departments.map((department) => (
                                                <option
                                                    id="list"
                                                    value={department}
                                                    key={department}
                                                >
                                                    {department}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        {/*{errors && (
                                <Form.Control.Feedback type="invalid">
                                    {errors}
                                </Form.Control.Feedback>
                            )}*/}
                                    </Form.Group>
                                </>
                            ) : (
                                <>
                                    <Form.Group>
                                        <Form.Control
                                            autoFocus
                                            className="w-100"
                                            style={{
                                                width: "100%",
                                                borderWidth: "1px",
                                                borderStyle: "solid",
                                            }}
                                            placeholder={r.name}
                                            value={newRow[r.name]}
                                            id={r.name}
                                            name={r.name}
                                            onChange={handleChange}
                                            // isInvalid={errors}
                                        />

                                        {/*{errors && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors}
                                        </Form.Control.Feedback>
                                    )}*/}
                                    </Form.Group>
                                </>
                            )
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        form="addRow"
                        className="w-100"
                        size="sm"
                        type="submit"
                        id="addBtn"
                    >
                        {props.btn}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddDatatableRow;
