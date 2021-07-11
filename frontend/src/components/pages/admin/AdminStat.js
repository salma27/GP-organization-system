import React from 'react';
import "./../../../css/adminStat.css";

import {StatNum,MyChart} from "./../../cards";

const data = [
    {
        department: "Computer Science",
        numOfDr: 15,
        numOfTAS: 20,
        numOfStud: 100
    },
    {
        department: "Decision Support",
        numOfDr: 20,
        numOfTAS: 15,
        numOfStud: 110
    },
    {
        department: "information system",
        numOfDr: 25,
        numOfTAS: 20,
        numOfStud: 90
    },
   ,

]
const cat=["Doctors","Teacher Assistants","Students"];
const departments=["Computer Science","Decision Support","information system"]
function NumIfnfo(props) {
    return (
        <div className="personInfo row">
            <div className="col-7 col-lg-3 mb-1">
                <label className="personInfo-hidder">{props.printMassage}</label>
            </div>
            <div className="col-12 col-lg-9">
                <p className="personInfo-second-text">{props.printNum}</p>
            </div>
        </div>
    );
}

const AdminStat = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                {cat.map((item,index)=><div className="col-3" key={index}>
                    <StatNum data={data} head={item}/>
                </div>)}
                <div className="col-3">
                    <StatNum data={data} head="teams"/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-3">
                    <StatNum data={data} head="Students Without Teams"/>
                </div>
                <div className="col-3">
                    <StatNum data={data} head="Doctors Have Place"/>
                </div>
                <div className="col-3">
                    <StatNum data={data} head="Teacher Assistants Have Place"/>
                </div>
            </div>    
            <hr className="mt-5 mb-4"/>
            <MyChart departments={departments}/>
                

        </div>
    );
}

export default AdminStat;