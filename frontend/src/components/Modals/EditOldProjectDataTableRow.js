import React, {  useState , useEffect} from "react";
import { Modal } from "react-bootstrap";
import {Projects} from "components/forms";
import "../StudentProfile/FieldsOfExperience.css";
import { Button, Form} from "react-bootstrap";
import { useAuthContext, useRequest, useValidation} from "hooks";
import EditProjectValidations from "./EditProjectValidations";
import {adminEditOldProjects} from "requests";
import { toast } from "react-toastify";

function EditOldProjectDataTableRow(props) {
    const [newRow, setNewRow] = useState(props.row);
    const [request, requesting] = useRequest(adminEditOldProjects)
    // const departments = ["CS", "IS", "IT", "DS"];
    const departments = props.departments;
    const tech =["REACT","TYPESCRIPT"];

    const { errors, validate } = useValidation(EditProjectValidations);
    const handleChange = ({ target: { name, value } }) => {
        validate({ ...newRow, [name]: value }, name).catch((e) => {});
        setNewRow({ ...newRow, [name]: value });
    };
    const selectDepartment = ({ target: { name, value } }) => {
        if (value !== "-1") setNewRow({ ...newRow, [name]: value });
        console.log(newRow);
    };
    console.log(newRow);
    // useEffect(() => {
    //     console.log(props.row)
    //     // setNewRow(props.row)
    // }, [])
    const handelOnClick = (e)=>{
        e.preventDefault();
        console.log(newRow);
        request({projectId:newRow.id,title:newRow.title,description:newRow.description,departmentId:newRow.departmentId,year:newRow.year,technologyIds:[newRow.tech]})
            .then((res)=>{
                console.log(newRow); 
                toast.success(res.data);  
                // history.push(adminOldProjects); 
                window.location.reload();
            })
            .catch((error)=>{
                toast.error("couldn't update");
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
                    <Modal.Title>Edit Row</Modal.Title>
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
                                            value={newRow.departmentId}
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
                            ) :(r.name!=="Edit" && r.name!=="technologyIds") ? (
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
                            ):r.name==="technologyIds" && (
                                <div>
                                    <label>Technology </label>
                                    <Projects tech={tech} setTech={setTech} technologyIds={newRow["technologyIds"]}/>
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

export default EditOldProjectDataTableRow;
