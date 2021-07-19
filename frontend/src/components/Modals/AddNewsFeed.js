import React, { useState } from "react";
import { Modal, Badge } from "react-bootstrap";
import "../StudentProfile/FieldsOfExperience.css";
import { Button, Form} from "react-bootstrap";
import suite from "./EditProjectValidations";
import {useValidation } from "hooks";
import EditProjectValidations from "./EditProjectValidations";

function AddNewdFeed(props) {
    const [oneTech, setOne] = useState();
    //const [formState, setFormState] = useState({});
    const [project, setProject] = useState({
        ptitle: props.title ? props.title : "",
        body: props.brief_description ? props.brief_description : "",
    });

    const result = suite.get();
    const setOneItem = (e) => setOne(e.target.value);
    const { errors, validate } = useValidation(EditProjectValidations);
    //const [title, setTitle] = useState(props.title);
    //const [description, setDescription] = useState(props.brief_description);

    const handleChange = ({ target: { name, value } }) => {
        validate({ ...project, [name]: value }, name).catch((e) => {});
        setProject({ ...project, [name]: value });
    };

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
                    >
                        Add News Feed
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddNewdFeed;
