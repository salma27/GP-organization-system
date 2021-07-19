import React, {  useState } from "react";
import { Modal } from "react-bootstrap";
import {Projects} from "components/forms";
import "../StudentProfile/FieldsOfExperience.css";
import { Button, Form} from "react-bootstrap";
import { useAuthContext, useRequest, useValidation} from "hooks";
import EditProjectValidations from "./EditProjectValidations";
import {adminAddOldProjects} from "requests";
import { toast } from "react-toastify";

function AddProjectRow(props) {
    const [newRow, setNewRow] = useState({tech:[]});
    const [request, requesting] = useRequest(adminAddOldProjects)
    // const departments = ["CS", "IS", "IT", "DS"];
    const departments = props.departments;
    // const tech =["REACT","TYPESCRIPT"];

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
        // console.log(newRow);
        request({title:newRow.title,description:newRow.description,departmentId:newRow.departmentId,year:newRow.year,technologyIds:newRow.tech})
            .then((res)=>{
                // console.log(newRow); 
                toast.success(res.data);  
                // history.push(adminOldProjects); 
                window.location.reload();
            })
            .catch((error)=>{
                toast.error("couldn't add");
            })
    }

    const setTech = (newTech)=>{
        setNewRow({...newRow,tech: newTech});
        // console.log(newTech);
    }
    return (
        <>
            <Modal centered show={props.show} onHide={props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Row</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="addRow">
                        {props.columns.map((r, i) =>
                            r.name === "departmentId" ? (
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
                            ) :(r.name!=="Edit" && r.name!=="technologies") ? (
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
                            ):r.name==="technologies" && (
                                <div>
                                    <label>Technology </label>
                                    <Projects setTech={setTech} />
                                </div>
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
                        onClick={handelOnClick}
                    >
                        {props.btn}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddProjectRow;
