import { useRequest } from "hooks";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import editStudentProfile from "requests/editStudentProfile";
import { BsButton } from "utils";
import "./Notes.css";

function Notes(props) {
    const [note, setNote] = useState({ value: props.info.bio });
    const [request, requesting] = useRequest(editStudentProfile);
    const editProfile = (event) => {
        event.preventDefault();
        request({ bio: note })
            .then((r) => {
                toast.success("Updated successully");
            })
            .catch((e) => {
                toast.error("Error updating profile");
            });
    };
    const handleChange = ({ target: { name, value } }) => {
        setNote({ ...note, [name]: value });
    };
    console.log(note.value);
    return (
        <>
            <Form className="w-100">
                <Form.Group>
                    <Form.Label>Notes: </Form.Label>
                    <Form.Control
                        autoFocus
                        as="textarea"
                        rows={3}
                        style={{
                            resize: "none",
                            backgroundColor: "#e9ecef",
                            opacity: 1,
                        }}
                        value={props.info.bio}
                        name="value"
                        id="value"
                        onChange={handleChange}
                        /*(e) => {
                            setNote(props.info.bio);
                            setNote(e.target.value);
                            console.log(note);
                        }}*/
                    />
                </Form.Group>
                <BsButton
                    size="sm"
                    id="notesBtn"
                    width="300px"
                    label="Add Notes"
                    onClick={editProfile}
                />
            </Form>
        </>
    );
}

export default Notes;
