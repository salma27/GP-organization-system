import React from "react";
import { FaUser, FaPen, FaMailBulk, FaPlus, FaMinus } from "react-icons/fa";
import "./BasicInfo.css";
import { ErrorHandlingInput } from "utils";
function BasicInfo() {
    return (
        <div>
            <div>
                <FaUser id="icon" />
                <span id="name">Name:</span>
                <ErrorHandlingInput id="personalInfo" readOnly="true" />
            </div>
            <div>
                <FaPen id="icon" />
                <span id="id">ID:</span>
                <ErrorHandlingInput id="personalInfo" readOnly="true" />
            </div>
            <div>
                <FaMailBulk id="icon" />
                <span id="mail">FCAI Mail:</span>
                <ErrorHandlingInput id="personalInfo" readOnly="true" />
            </div>
            <div>
                <FaPlus id="icon" />
                <span id="major">Major:</span>
                <ErrorHandlingInput id="personalInfo" readOnly="true" />
            </div>
            <div>
                <FaMinus id="icon" />
                <span id="minor">Minor:</span>
                <ErrorHandlingInput id="personalInfo" readOnly="true" />
            </div>
        </div>
    );
}

export default BasicInfo;
