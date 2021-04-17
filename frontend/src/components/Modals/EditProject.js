import React, { useRef, useState } from "react";
import { Modal, Badge } from "react-bootstrap";
import { Editable } from "utils";
import FieldsOfExperience from "../StudentProfile/FieldsOfExperience";

function EditProject(props) {
    const [title, setTitle] = useState("");
    const inputRef = useRef();
    const technology = [
        "Machine Learning",
        "Artifical Intelligence",
        "Web Application",
        "Others",
    ];
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
                    <FieldsOfExperience tech={technology} />
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditProject;
