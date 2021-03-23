import React, {useState} from "react";
import {Form} from "react-bootstrap";
import {BsButton} from "utils";
import "./Notes.css";

function Notes() {
    const [note, setNote] = useState("Any notes?");
    return (
        <>
            <Form>
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
                        value="Any notes?"
                        onClick={() => {
                            if (note === "Any notes?") setNote("");
                        }}
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
