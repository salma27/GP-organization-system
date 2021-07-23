import React, {  useState } from "react";
import { Modal } from "react-bootstrap";
import {Projects} from "components/forms";
import "../StudentProfile/FieldsOfExperience.css";
import { Button, Form} from "react-bootstrap";
import { useAuthContext, useRequest, useValidation} from "hooks";
import EditProjectValidations from "./EditProjectValidations";
import {adminEditDepartment} from "requests";
import { toast } from "react-toastify";

function EditDepartmentRow(props) {
    const [newRow, setNewRow] = useState(props.row);
    const [request, requesting] = useRequest(adminEditDepartment);

    const { errors, validate } = useValidation(EditProjectValidations);

    const handleChange = ({ target: { name, value } }) => {
        validate({ ...newRow, [name]: value }, name).catch((e) => {});
        setNewRow({ ...newRow, [name]: value });
    };

    const handelOnClick = (e)=>{
        e.preventDefault();
        // console.log({...newRow,departmentId:newRow.id})
        if(newRow.name.length === 0 || newRow.minNumberOfSupervisors.length === 0 
            || newRow.maxNumberOfSupervisors.length === 0 || newRow.minNumberOfStudents.length === 0 || newRow.maxNumberOfStudents.length === 0){
            toast.error("All fields must have vaule");
        }else if(parseInt(newRow.minNumberOfStudents) < 0 || parseInt(newRow.maxNumberOfStudents) < 0 
            || parseInt(newRow.minNumberOfSupervisors) < 0 || parseInt(newRow.maxNumberOfSupervisors) < 0){
            toast.error("numbers must be postive");
        }else if(parseInt(newRow.minNumberOfStudents) > parseInt(newRow.maxNumberOfStudents)){
            toast.error("min number of student must be less than or equal max number of student");
        }else if(parseInt(newRow.minNumberOfSupervisors) > parseInt(newRow.maxNumberOfSupervisors)){
            toast.error("min number of supervisor must be less than or equal max number of supervisor");
        }else{
            request({...newRow,departmentId:newRow.id})
            .then((res)=>{
                // console.log(newRow); 
                toast.success(res.data.message);  
                // history.push(adminOldProjects); 
                window.location.reload();
            })
            .catch((error)=>{
                toast.error("couldn't add department");
            })
        }
    }

    return (
        <>
            <Modal centered show={props.show} onHide={props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Department</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="addDepartmentRow">
                        {props.columns.map((r, i) =>
                            (r.name!=="Edit") && 
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
                                            value={newRow[r.name]}
                                            id={r.name}
                                            name={r.name}
                                            onChange={handleChange}
                                            type = {r.name==="name"?"text":"number"}
                                            min="1"
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

export default EditDepartmentRow;
