import React from 'react';

function Notes() {
    return (
        <div id="notesSection" >
            <div>
                <textarea id="notes" placeholder="Notes(You may add your phone number, other mails, or any other notes here.
            ):" ></textarea>

            </div>
            <button id="updateNotes" >Update Notes</button>


        </div>


    );
}

export default Notes;