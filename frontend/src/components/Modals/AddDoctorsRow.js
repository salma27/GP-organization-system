import React, {  useState } from "react";
import { Modal } from "react-bootstrap";
import {Projects} from "components/forms";
import "../StudentProfile/FieldsOfExperience.css";
import { Button, Form} from "react-bootstrap";
import { useAuthContext, useRequest, useValidation, useDepartments} from "hooks";
import EditProjectValidations from "./EditProjectValidations";
import { adminAddDoctor } from "requests";
import { toast } from "react-toastify";


function AddDoctorsRow(props) {
    const [newRow, setNewRow] = useState({});
    const [request, requesting] = useRequest(adminAddDoctor)
    const [departments] = useDepartments();

    const { errors, validate } = useValidation(EditProjectValidations);
    const handleChange = ({ target: { name, value } }) => {
        validate({ ...newRow, [name]: value }, name).catch((e) => {});
        setNewRow({ ...newRow, [name]: value });
    };
    const selectDepartment = ({ target: { name, value } }) => {
        if (value !== "-1") setNewRow({ ...newRow, [name]: value });
        // console.log(newRow);
    };

    const handelOnClick = (e)=>{
        e.preventDefault();
        request(newRow)
            .then((res)=>{
                // console.log(newRow); 
                toast.success(res.data.message);  
                window.location.reload();
            })
            .catch((error)=>{
                toast.error("couldn't add Doctor");
            })
    }

    return (
        <>
            <Modal centered show={props.show} onHide={props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Doctor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="addDoctor">
                        {props.columns.map((r, i) =>
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
                                                    value={department.id}
                                                    key={department.id}
                                                >
                                                    {department.name} ({department.id})
                                                </option>
                                            ))}
                                        </Form.Control>
                                        {/* {errors && (
                                <Form.Control.Feedback type="invalid">
                                    {errors}
                                </Form.Control.Feedback>
                            )} */}
                                    </Form.Group>
                                </>
                            ) :(r.name!=="Edit" && r.name!=="teams") &&  (
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

                                        {/* {errors && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors}
                                        </Form.Control.Feedback>
                                    )} */}
                                    </Form.Group>
                                </>
                            )
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        form="addDoctor"
                        className="w-100"
                        size="sm"
                        type="submit"
                        id="addBtn"
                        onClick={handelOnClick}
                    >
                        {props.btn}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddDoctorsRow;
