import React, { useState } from "react";
import { Modal, Badge } from "react-bootstrap";
import "../StudentProfile/FieldsOfExperience.css";
import { Button, Form} from "react-bootstrap";
import suite from "./EditProjectValidations";
import {useValidation } from "hooks";
import EditProjectValidations from "./EditProjectValidations";
import { useRequest } from "hooks";
import { adminAddFeed } from "requests";
import { toast } from "react-toastify";

function AddNewdFeed(props) {
    const [request,requesting] = useRequest(adminAddFeed);

    const [project, setProject] = useState({
        ptitle: props.title ? props.title : "",
        body: props.brief_description ? props.brief_description : "",
    });

    const { errors, validate } = useValidation(EditProjectValidations);

    const handleChange = ({ target: { name, value } }) => {
        validate({ ...project, [name]: value }, name).catch((e) => {});
        setProject({ ...project, [name]: value });
    };

    const handleOnClick = (e)=>{
        e.preventDefault();
        if(project.ptitle.length > 0 && project.body.length > 0){
            request({title:project.ptitle,content:project.body})
                .then(response=>{
                    toast.success(response.data.message);
                    window.location.reload();
                })
                .catch((e) => toast.error("Could't add news feed"))
        }else{
            toast.error("All fields shouldn't be empty")
        }
    }

    return (
        <>
            <Modal centered show={props.show} onHide={props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add News Feed</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="AddNewsFeed">
                        <Form.Group>
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                autoFocus
                                className="w-100"
                                name="ptitle"
                                id="ptitle"
                                style={{
                                    width: "100%",
                                    // borderColor: "#00BFA6",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                }}
                                //placeholder={title}
                                value={project.ptitle}
                                /*onChange={(e) => {
                                    validate(e.target.value).catch((e) => {});
                                    setTitle(e.target.value);
                                }}*/
                                onChange={handleChange}
                                isInvalid={errors.ptitle}
                                //errors={result.getErrors("title")}
                            />
                            {errors.ptitle && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.ptitle}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description: </Form.Label>
                            <Form.Control
                                autoFocus
                                name="body"
                                id="body"
                                as="textarea"
                                rows={3}
                                style={{
                                    resize: "none",
                                    // borderColor: "#00BFA6",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                }}
                                value={project.body}
                                /*placeholder={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}*/
                                onChange={handleChange}
                                isInvalid={errors.body}
                                //errors={result.getErrors("title")}
                            />
                            {errors.body && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.body}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        form="AddNewsFeed"
                        className="w-100 btn btn-secondary "
                        size="sm"
                        type="submit"
                        id="addBtn"
                        style={{
                            // backgroundColor: "#00BFA6",
                            // color: "white",
                        }}
                        onClick={handleOnClick}
                    >
                        Add News Feed
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddNewdFeed;
