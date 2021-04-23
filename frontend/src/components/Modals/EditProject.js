import React, { useRef, useState } from "react";
import { Modal, Badge } from "react-bootstrap";
import { Editable, BsButton } from "utils";
import FieldsOfExperience from "../StudentProfile/FieldsOfExperience";
import "../StudentProfile/FieldsOfExperience.css";
import { Button, Form, Table, Col, Row, Container } from "react-bootstrap";
import suite from "./EditProjectValidations";
import { useAuthContext, useRequest, useValidation } from "hooks";
import EditProjectValidations from "./EditProjectValidations";

function EditProject(props) {
    const [oneTech, setOne] = useState();
    //const [formState, setFormState] = useState({});
    const [project, setProject] = useState({
        ptitle: props.title,
        description: props.brief_description,
    });
    const result = suite.get();
    const setOneItem = (e) => setOne(e.target.value);
    const { errors, validate } = useValidation(EditProjectValidations);
    //const [title, setTitle] = useState(props.title);
    const [tech, setTech] = useState(props.tech);
    //const [description, setDescription] = useState(props.brief_description);
    const technology = [
        "Machine Learning",
        "Artifical Intelligence",
        "Web Application",
        "Others",
    ];
    const removeItem = (index) => {
        const temp = [];
        tech.forEach((v, i) => {
            if (index !== i) {
                temp.push(v);
            }
        });
        setTech(temp);
    };
    const selected = () => {
        if (oneTech && !tech.includes(oneTech) && oneTech !== "-1")
            setTech([...tech, oneTech]);
    };

    const handleChange = ({ target: { name, value } }) => {
        validate({ ...project, [name]: value }, name).catch((e) => {});
        setProject({ ...project, [name]: value });
    };
    return (
        <>
            <Modal centered show={props.show} onHide={props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="editProject">
                        <Form.Group>
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                autoFocus
                                className="w-100"
                                name="ptitle"
                                id="ptitle"
                                style={{
                                    width: "100%",
                                    borderColor: "#00BFA6",
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
                            <Form.Label>Brief Description: </Form.Label>
                            <Form.Control
                                autoFocus
                                name="description"
                                id="description"
                                as="textarea"
                                rows={3}
                                style={{
                                    resize: "none",
                                    borderColor: "#00BFA6",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                }}
                                value={project.description}
                                /*placeholder={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}*/
                                onChange={handleChange}
                                isInvalid={errors.description}
                                //errors={result.getErrors("title")}
                            />
                            {errors.description && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.description}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Row className="w-100">
                                <label className="form-label">
                                    Used Technologies:
                                </label>
                            </Row>
                            <Row className="w-100">
                                <Col lg={9} sm={12}>
                                    <Form
                                        onSubmit={(e) => e.preventDefault()}
                                        className="w-100"
                                    >
                                        <Form.Control
                                            as="select"
                                            style={{
                                                color: "#00BFA6",
                                                borderColor: "#00BFA6",
                                                borderWidth: "1px",
                                                borderStyle: "solid",
                                            }}
                                            onChange={setOneItem}
                                        >
                                            <option
                                                value="-1"
                                                id="list"
                                            ></option>

                                            {technology.map((addField) => (
                                                <option
                                                    id="list"
                                                    value={addField}
                                                    key={addField}
                                                >
                                                    {addField}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form>
                                </Col>
                                <Col lg={3} sm={12}>
                                    <Button
                                        className="w-100"
                                        size="sm"
                                        type="button"
                                        id="addBtn"
                                        onClick={selected}
                                        style={{
                                            backgroundColor: "#00BFA6",
                                            color: "white",
                                        }}
                                    >
                                        +
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Group>
                        {tech.map((t, i) => (
                            <Badge
                                pill
                                style={{
                                    color: "#00BFA6",
                                    borderColor: "#00BFA6",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                }}
                                className=" mb-1"
                                key={i}
                            >
                                {t}
                                <a
                                    href="#"
                                    style={{
                                        marginLeft: "15px",
                                    }}
                                    size="sm"
                                    type="submit"
                                    onClick={() => removeItem(i)}
                                    variant="secondary"
                                >
                                    x
                                </a>
                            </Badge>
                        ))}
                        {!props.tech.length && "No technologies provided"}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        form="editProject"
                        className="w-100"
                        size="sm"
                        type="submit"
                        id="addBtn"
                        style={{
                            backgroundColor: "#00BFA6",
                            color: "white",
                        }}
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditProject;
