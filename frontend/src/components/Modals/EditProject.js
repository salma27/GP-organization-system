import React, { useRef, useState } from "react";
import { Badge } from "react-bootstrap";
import { Modal } from "react-bootstrap";
//import { Modal } from "utils-2";
import { Editable, BsButton } from "utils";
import FieldsOfExperience from "../StudentProfile/FieldsOfExperience";
import "../StudentProfile/FieldsOfExperience.css";
import { Button, Form, Table, Col, Row, Container } from "react-bootstrap";
import suite from "./EditProjectValidations";
import {
    useAuthContext,
    useRequest,
    useTechnology,
    useValidation,
} from "hooks";
import EditProjectValidations from "./EditProjectValidations";
import { toast } from "react-toastify";
import { addTeamProjectRequests, editTeamProjectRequests } from "requests";

function EditProject(props) {
    const [oneTech, setOne] = useState();
    const [request, requesting] = useRequest(
        props.type === "Add" ? addTeamProjectRequests : editTeamProjectRequests
    );

    const { errors, validate } = useValidation(EditProjectValidations);
    const [tech, setTech] = useState(props.tech ? props.tech : []);
    const [project, setProject] = useState({
        ptitle: props.title ? props.title : "",
        description: props.brief_description ? props.brief_description : "",
        tech: tech ? tech : [],
    });
    const [technology] = useTechnology();
    const setOneItem = (e) => setOne(technology[e.target.value]);
    const removeItem = (index) => {
        const temp = [];
        tech.forEach((v) => {
            if (index !== v.i) {
                temp.push(v);
            }
        });
        setTech(temp);
    };
    const selected = () => {
        const techID = [];
        tech.forEach((t) => {
            techID.push(t.id);
        });
        if (oneTech && !techID.includes(oneTech.id) && oneTech.id !== "-1")
            setTech([...tech, oneTech]);
    };

    const handleChange = ({ target: { name, value } }) => {
        validate({ ...project, [name]: value }, name).catch((e) => {});
        setProject({ ...project, [name]: value });
    };
    function addProject(event) {
        setProject({ ...project, [tech]: tech });
        // console.log("in add button click");
        event.preventDefault();
        validate(project)
            .then(() => {
                // console.log("Validation success");
                const tmp = [];
                tech.forEach((t) => {
                    tmp.push(t.id);
                });
                request({
                    title: project.ptitle,
                    description: project.description,
                    technologyIds: tmp,
                })
                    .then((r) => {
                        toast.success("Project Added Successfully");
                    })
                    .catch((e) => {
                        toast.error("Invalid Input");
                    });
            })
            .catch((e) => {});
    }

    function editProject(event) {
        setProject({ ...project, [tech]: tech });
        //console.log("in edit button click");
        event.preventDefault();
        validate(project)
            .then(() => {
                const tmp = [];
                tech.forEach((t) => {
                    tmp.push(t.id);
                });
                //console.log("Validation success");
                request({
                    projectId: props.projectId,
                    title: project.ptitle,
                    description: project.description,
                    technologyIds: tmp,
                })
                    .then((r) => {
                        toast.success("Project Updated Successfully");
                    })
                    .catch((e) => {
                        toast.error("Coudln't update your project");
                    });
            })
            .catch((e) => {});
    }

    return (
        <>
            <Modal centered show={props.show} onHide={props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.btn}</Modal.Title>
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
                                value={project.ptitle}
                                onChange={handleChange}
                                isInvalid={errors.ptitle}
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
                                onChange={handleChange}
                                isInvalid={errors.description}
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

                                            {technology.length &&
                                                technology.map(
                                                    (addField, i) => (
                                                        <option
                                                            id="list"
                                                            value={i}
                                                            key={addField.id}
                                                        >
                                                            {addField.name}
                                                        </option>
                                                    )
                                                )}
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
                        {tech &&
                            tech.length &&
                            tech.map((t) => (
                                <Badge
                                    pill
                                    style={{
                                        color: "#00BFA6",
                                        borderColor: "#00BFA6",
                                        borderWidth: "1px",
                                        borderStyle: "solid",
                                    }}
                                    className=" mb-1"
                                    key={t.id}
                                >
                                    {t.name}
                                    <a
                                        href="#"
                                        style={{
                                            marginLeft: "15px",
                                        }}
                                        size="sm"
                                        type="submit"
                                        onClick={() => removeItem(t.id)}
                                        variant="secondary"
                                    >
                                        x
                                    </a>
                                </Badge>
                            ))}
                        {!tech.length && "No technologies provided"}
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
                        onClick={
                            props.type === "Add" ? addProject : editProject
                        }
                    >
                        {props.btn}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditProject;
