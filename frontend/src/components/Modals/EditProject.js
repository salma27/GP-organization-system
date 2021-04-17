import React, { useRef, useState } from "react";
import { Modal, Badge } from "react-bootstrap";
import { Editable, BsButton } from "utils";
import FieldsOfExperience from "../StudentProfile/FieldsOfExperience";
import "../StudentProfile/FieldsOfExperience.css";
import { Button, Form, Col, Row, Container } from "react-bootstrap";

function EditProject(props) {
    const [oneTech, setOne] = useState();

    const setOneItem = (e) => setOne(e.target.value);

    const [title, setTitle] = useState("");
    const inputRef = useRef();
    const [tech, setTech] = useState(props.tech);
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
    return (
        <>
            <Modal centered show={props.show} onHide={props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {/**
                        <Editable
                            text={title}
                            value={title}
                            placeholder={title}
                            childRef={inputRef}
                            type="input"
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                name="title"
                                placeholder={title}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Editable>
                        **/}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.brief_description}</Modal.Body>
                <Modal.Footer>
                    <Form
                        onSubmit={(e) => e.preventDefault()}
                        className="w-100"
                    >
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Fields Of Experience:</Form.Label>
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
                                <option value="-1" id="list"></option>

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
                        </Form.Group>
                        <Button size="sm" id="addBtn" onClick={selected}>
                            +
                        </Button>
                    </Form>

                    {tech.map((t, i) => (
                        <Badge
                            pill
                            style={{
                                color: "#00BFA6",
                                borderColor: "#00BFA6",
                                borderWidth: "1px",
                                borderStyle: "solid",
                            }}
                            className="mr-1 mb-1"
                            key={i}
                        >
                            {t}
                            <a
                                href="#"
                                style={{
                                    float: "right",
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
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditProject;
