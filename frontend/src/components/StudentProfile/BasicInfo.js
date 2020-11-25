import React from "react";
import { FaUser, FaPen, FaMailBulk, FaPlus, FaMinus } from "react-icons/fa";
import "./BasicInfo.css";

function BasicInfo() {
    return (
        <div>
            <FaUser id="icon" />
            <pre id="name">Name: Salma Essam Soliman</pre>
            <FaPen id="icon" />
            <pre id="id">ID: 20170115</pre>
            <FaMailBulk id="icon" />
            <pre id="mail">FCAI Mail: ssalma.essamm@gmail.com</pre>
            <FaPlus id="icon" />
            <pre id="major">Major: CS</pre>
            <FaMinus id="icon" />
            <pre id="minor">Minor: DS</pre>
        </div>
        /*React.createElement(
          'div',
          null,
          "Student's Profile",
          React.createElement('pre', "id=name", "Name: "),
          React.createElement('pre', "id=id", "ID: "),
          React.createElement('pre', "id=mail", "FCAI Mail: "),
          React.createElement('pre', "id=major", "Major: "),
          React.createElement('pre', "id=minor", "Minor: ")
         )*/
    );
}

export default BasicInfo;
