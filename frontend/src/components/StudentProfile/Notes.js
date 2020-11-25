import React, { useState } from "react";

import { Button } from "utils";
import "./Notes.css";

function Notes() {
    const [note, setNote] = useState(
        "(You may add your phone number, other mails, or any other notes here):"
    );
    return (
        <div id="notesSection">
            <div>
                <p>Notes:</p>
                <textarea
                    id="notes"
                    value={note}
                    onClick={() => {
                        if (
                            note ===
                            "(You may add your phone number, other mails, or any other notes here):"
                        )
                            setNote("");
                    }}
                    onChange={(e) => {
                        setNote(e.target.value);
                    }}
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
