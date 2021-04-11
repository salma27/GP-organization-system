import React, { useState } from "react";
import { Modal, Badge } from "react-bootstrap";

function EditProject(props) {
    return (
        <>
            <Modal centered show={props.show} onHide={props.hide}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <b>{props.title}</b>
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
