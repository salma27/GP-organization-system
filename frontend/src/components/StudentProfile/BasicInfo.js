import React from "react";
import { FaUser, FaPen, FaMailBulk, FaPlus, FaMinus } from "react-icons/fa";
import "./BasicInfo.css";
import { ErrorHandlingInput } from "utils";
function BasicInfo() {
    return (
        <div>
            
            <table className = "center">
                <tr>
                    <td><FaUser id="icon" /></td>
                    <td><span id="name">Name:</span></td>
                    <td><ErrorHandlingInput id="personalInfo" readOnly="true" /> </td>
                </tr>
                <tr>
                    <td><FaPen id="icon" /> </td>
                    <td><span id="id">ID:</span> </td>
                    <td><ErrorHandlingInput id="personalInfo" readOnly="true" /> </td>
                </tr>
                <tr>
                    <td><FaMailBulk id="icon" /></td>
                    <td><span id="mail">FCAI Mail:</span></td>
                    <td><ErrorHandlingInput id="personalInfo" readOnly="true" /></td>
                </tr>
                <tr>
                    <td><FaPlus id="icon" /></td>
                    <td><span id="major">Major:</span></td>
                    <td><ErrorHandlingInput id="personalInfo" readOnly="true" /></td>
                </tr>
                <tr>
                    <td><FaMinus id="icon" /></td>
                    <td><span id="minor">Minor:</span></td>
                    <td><ErrorHandlingInput id="personalInfo" readOnly="true" /></td>
                </tr>
            </table>
           
        </div>
    );
}

export default BasicInfo;
