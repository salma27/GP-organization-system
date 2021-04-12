import React, { useRef, useState } from "react";
import { Modal, Badge } from "react-bootstrap";
import { Editable } from "utils";
function EditProject(props) {
    const [title, setTitle] = useState("");
    const inputRef = useRef();
    return (
        <>
            <Modal centered show={props.show} onHide={props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>
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
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.brief_description}</Modal.Body>
                <Modal.Footer>
                    {props.tech.map((t, i) => (
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
                        </Badge>
                    ))}
                    {!props.tech.length && "No technologies provided"}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditProject;
