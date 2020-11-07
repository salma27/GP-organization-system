import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


function BasicInfo(){
  return (
    React.createElement(
      'div',
      null,
      "Student's Profile",
      React.createElement('pre', "id=name", "Name: "),
      React.createElement('pre', "id=id", "ID: "),
      React.createElement('pre', "id=mail", "FCAI Mail: "),
      React.createElement('pre', "id=major", "Major: "),
      React.createElement('pre', "id=minor", "Minor: ")
     )
  );
}

function FieldsOfExperience(){
  return(
    React.createElement(
      'div',
      null,
      "Fields Of Experience: ",
      React.createElement('button', "id=add", "ADD"),
      React.createElement('button', "id=delete", "DELETE")
    )
  );
}

function Notes(){
  return(
    React.createElement(
      'div',
      "id=notesSection style={{float=left}}", 
      React.createElement('textarea', "id=notes value=Notes: "),
      React.createElement('p', null,
      "You may add your phone number, other mails, or any other notes here"),
      React.createElement('button', "id=updateNotes", "Update Notes")
    )
    
  );
}

function StudentProfile(){
  return (
    
    <div>
      <BasicInfo />
      <FieldsOfExperience />
      <Notes />
    </div>
  );
}

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
