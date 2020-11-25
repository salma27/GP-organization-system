import React from "react";
import { Button } from "utils";
import "./Notes.css";

function Notes() {
    return (
        <div id="notesSection">
            <div>
                <p>Notes:</p>
                <textarea
                    id="notes"
                    value="You may add your phone number, other mails, or any other notes here"
                ></textarea>
            </div>
            <Button
                className="updateNotes"
                label="Update Notes"
                width="300px"
            />
        </div>
    );
}

export default Notes;
