import React from 'react';
import BasicInfo from './BasicInfo';
import FieldsOfExperience from './FieldsOfExperience';
import Notes from './Notes';
import Title from './Title';
import "./StudentProfile.css";


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



export default StudentProfile;