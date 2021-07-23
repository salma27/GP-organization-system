import React, {  useState } from "react";
import { Modal } from "react-bootstrap";
import {Projects} from "components/forms";
import "../StudentProfile/FieldsOfExperience.css";
import { Button, Form} from "react-bootstrap";
import { useAuthContext, useRequest, useValidation} from "hooks";
import EditProjectValidations from "./EditProjectValidations";
import { toast } from "react-toastify";

function Technology(props) {
    const [newRow, setNewRow] = useState(props.row);
    const [request, requesting] = useRequest(props.request);

    const { errors, validate } = useValidation(EditProjectValidations);

    const handleChange = ({ target: { name, value } }) => {
        validate({ ...newRow, [name]: value }, name).catch((e) => {});
        setNewRow({ ...newRow, [name]: value });
    };

    const handelOnClick = (e)=>{
        e.preventDefault();
        console.log(newRow)
        if(newRow.name.length === 0 ){
            toast.error("All fields must have vaule");
        }else{
            request(newRow)
                .then((res)=>{
                    // console.log(newRow); 
                    toast.success(res.data.message);  
                    // history.push(adminOldProjects); 
                    window.location.reload();
                })
                .catch((error)=>{
                    toast.error("failed");
                })
        }
    }

    return (
        <>
            <Modal centered show={props.show} onHide={props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="Technoloy">
                        {props.columns.map((r, i) =>
                            (r.name!=="Edit" && r.name !== "id") && 
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
                                            type = "text"
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
                        form="Technoloy"
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

export default Technology;
