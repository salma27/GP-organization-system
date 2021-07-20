import React from 'react';
import "./../../css/personInfoCard.css";

const Note = (props) => {
    return ( 
        <div className="personinfo-block">
            <h5 className="personInfo-hidder w-fit-mb">Notes</h5>
            <p className="personInfo-second-text">{props.note}
            </p>
        </div>
    );
}
 
export default Note;