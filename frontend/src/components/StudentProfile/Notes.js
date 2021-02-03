import React, { useState } from "react";

import { Button } from "utils";
import "./Notes.css";

function Notes() {
    const [note, setNote] = useState("Notes:");
    return (
        <div id="notesSection">
            <div>
                <p>Notes:</p>
                <textarea
                    id="notes"
                    value={note}
                    onClick={() => {
                        if (note === "Notes:") setNote("");
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
