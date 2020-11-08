import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./StudentProfile.css";

function BasicInfo(){
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

function FieldsOfExperience(props){
  const [value, setValue] = useState("None");
  const selected = (event) => { setValue(event.target.value)};
  const add = (value)=>{<ul>{value}</ul>};
  return(
     <div>
      <div>
          <label>Fields Of Experience:</label>
          <select onChange={selected}>{props.tech.map(addField => <option value={addField} key={addField}>{addField}</option>)}</select>
          <button onClick={add}>+</button>
      </div>
  <div id="field">{add}</div>
     </div>
  );
}

function Notes(){
  return(
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

function Title(props){
  return(
    <div id="title"><h1> <span id="orange">{props.orange} </span> {props.black} </h1></div>
  );

}

function StudentProfile(){
  const technology=["Machine Learning", "Artifical Intelligence", "Web Application", "Others"];
  return (
    
    <div>
      <Title orange="Student's" black="Profile"/>
      <BasicInfo />
      <FieldsOfExperience tech={technology}/>
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



ReactDOM.render(
  //<React.StrictMode>
    //<App />
  //</React.StrictMode>,
  <StudentProfile />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
