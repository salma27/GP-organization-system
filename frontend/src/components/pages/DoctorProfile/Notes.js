import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { BsButton } from "utils";
import {useRequest} from "hooks";
import {staffEditProfile} from "requests";
import { toast } from "react-toastify";

function Notes(props) {
    const [note, setNote] = useState(props.bio);
    const [request,requesting] = useRequest(staffEditProfile);

    useEffect(() => {
        setNote(props.bio)
    }, [props.bio])

    const handleClick =(e)=>{
        e.preventDefault();
        request({ bio: note })
            .then(res=>{
                toast.success("updated successfully")
                window.location.reload();
            })
            .catch(e=>{
                toast.error("Couldn't update");
            })
    }
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
                        placeholder="Any Note?"
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
                    onClick={handleClick}
                />
            </Form>
        </>
    );
}

export default Notes;
