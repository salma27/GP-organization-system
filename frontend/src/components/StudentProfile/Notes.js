import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { BsButton } from "utils";
import "./Notes.css";

function Notes(props) {
    const [note, setNote] = useState(props.bio);
    return (
        <>
            <Form onSubmit={(e) => e.preventDefault()} className="w-100">
                <Form.Group>
                    <Form.Label>Notes: </Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        style={{
                            resize: "none",
                            backgroundColor: "#e9ecef",
                            opacity: 1,
                        }}
                        value={note}
                        onChange={(e) => {
                            setNote(e.target.value);
                        }}
                    />
                </Form.Group>
                <BsButton
                    size="sm"
                    id="notesBtn"
                    width="300px"
                    label="Add Notes"
                />
            </Form>
        </>
    );
}

export default Notes;
