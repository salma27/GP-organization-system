import React, {  useState } from "react";
import { Modal } from "react-bootstrap";
import {Projects} from "components/forms";
import "../StudentProfile/FieldsOfExperience.css";
import { Button, Form} from "react-bootstrap";
import { useAuthContext, useRequest, useValidation} from "hooks";
import EditProjectValidations from "./EditProjectValidations";
import {adminAddDepartment} from "requests";
import { toast } from "react-toastify";

function AddDepartmentRow(props) {
    const [newRow, setNewRow] = useState({});
    const [request, requesting] = useRequest(adminAddDepartment)

    const { errors, validate } = useValidation(EditProjectValidations);

    const handleChange = ({ target: { name, value } }) => {
        validate({ ...newRow, [name]: value }, name).catch((e) => {});
        setNewRow({ ...newRow, [name]: value });
    };

    const handelOnClick = (e)=>{
        e.preventDefault();
        console.log(newRow)
        request(newRow)
            .then((res)=>{
                // console.log(newRow); 
                toast.success(res.data);  
                // history.push(adminOldProjects); 
                window.location.reload();
            })
            .catch((error)=>{
                toast.error("couldn't add department");
            })
    }

    return (
        <>
            <Modal centered show={props.show} onHide={props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Department</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="addDepartmentRow">
                        {props.columns.map((r, i) =>
                            (r.label!=="edit") && 
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
                                            placeholder={r.label}
                                            value={newRow[r.label]}
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
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        form="addDepartmentRow"
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

export default AddDepartmentRow;
