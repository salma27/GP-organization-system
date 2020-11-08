import React, { useState } from 'react';
import "./StudentProfile.css";

function BasicInfo() {
  return (
    <div >
      <pre id="name" >Name: Salma Essam Soliman</pre>
      <pre id="id" >ID: 20170115</pre>
      <pre id="mail" >FCAI Mail: ssalma.essamm@gmail.com</pre>
      <pre id="major" >Major: CS</pre>
      <pre id="minor" >Minor: DS</pre>
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

function FieldsOfExperience(props) {
  const [value, setValue] = useState([]);
  const [oneTech, setOne] = useState();
  const selected = () => { if (oneTech && !value.includes(oneTech) && oneTech != "-1") setValue([...value, oneTech]) };
  const setOneItem = (e) => setOne(e.target.value);
  const removeItem = (index) => {
    const temp = [];
    value.forEach((v, i) => {
      if (index !== i) {
        temp.push(v);
      }
    })
    setValue(temp);
  }
  return (
    <div>
      <div>
        <label>Fields Of Experience:</label>
        <select onChange={setOneItem}><option value="-1" >
        </option>{props.tech.map(addField => <option value={addField} key={addField}>{addField}</option>)}</select>
        <button onClick={selected}>+</button>
      </div>
      <div id="field"><ul>
        {value.map((v, i) =>
          <li key={i}>{v}<button onClick={() => removeItem(i)}>x</button></li>
        )}
      </ul></div>
    </div>
  );
}

function Notes() {
  return (
    <div id="notesSection" >
      <div>
        <textarea id="notes" placeholder="Notes(You may add your phone number, other mails, or any other notes here.
          ):" ></textarea>

      </div>
      <button id="updateNotes" >Update Notes</button>


    </div>
    /*React.createElement(
      'div',
      "id=notesSection style={{float=left}}", 
      React.createElement('textarea', "id=notes value=Notes: "),
      React.createElement('p', null,
      "You may add your phone number, other mails, or any other notes here"),
      React.createElement('button', "id=updateNotes", "Update Notes")
    )*/

  );
}

function Title(props) {
  return (
    <div id="title"><h1> <span id="orange">{props.orange} </span> {props.black} </h1></div>
  );

}

function StudentProfile() {
  const technology = ["Machine Learning", "Artifical Intelligence", "Web Application", "Others"];
  return (

    <div>
      <Title orange="Student's" black="Profile" />
      <BasicInfo />
      <FieldsOfExperience tech={technology} />
      <Notes />
    </div>
  );
}
/*
function App () {
  return (
    <StudentProfile />
  );
}

export default App;
*/

//ReactDOM.render(
//<StudentProfile />,
//document.getElementById('mountNode'),
//);



export default StudentProfile;