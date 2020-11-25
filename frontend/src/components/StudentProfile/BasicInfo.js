import React from "react";

function BasicInfo() {
    return (
        <div>
            <div class="icons">
                <i class="fa fa-mobile"></i>
            </div>
            <pre id="name">Name: Salma Essam Soliman</pre>
            <pre id="id">ID: 20170115</pre>
            <pre id="mail">FCAI Mail: ssalma.essamm@gmail.com</pre>
            <pre id="major">Major: CS</pre>
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
