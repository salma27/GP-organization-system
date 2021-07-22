import React, {useState, useEffect} from 'react';
import "./../../../css/adminStat.css";
import {StatNum,MyChart} from "./../../cards";
import { AdminGetStat } from "requests";
import { useRequest } from "hooks";
import { toast } from "react-toastify";

// const data = [
//     {
//         department: "Computer Science",
//         numOfDr: 15,
//         numOfTAS: 20,
//         numOfStud: 100
//     },
//     {
//         department: "Decision Support",
//         numOfDr: 20,
//         numOfTAS: 15,
//         numOfStud: 110
//     },
//     {
//         department: "information system",
//         numOfDr: 25,
//         numOfTAS: 20,
//         numOfStud: 90
//     },
//    ,

// ]
const cat=["Doctors","Teacher Assistants","Students"];
// const departments=["Computer Science","Decision Support","information system"]
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
    const [data,setData] = useState({});
    const [request,requesting] = useRequest(AdminGetStat);
    const [department,setDepartment] = useState([]);
    const [chartValue,setChartValue] = useState([]);

    const stat = [  {id:"drStat",title:"Doctors"}, 
                    {id:"taStat",title:"Teaching Assistants"},
                    {id:"studStat",title:"Students"},
                    {id:"teamStat",title:"Teams"},
                    {id:"singleStat",title:"Students Without Teams"},
                    {id:"availableDrStat",title:"Doctors Have Place"},
                    {id:"availableTaStat",title:"Teacher Assistants Have Place"},
                ]
    useEffect(() => {
        request()
            .then(res=>{
                // console.log(res.data);
                let temp1 = [];
                let temp2 = [];

                res.data.teamStat.stat.map(ele =>{
                    temp1.push(ele.name);
                    temp2.push(ele.count);
                })
                console.log(temp1,temp2);
                setDepartment(temp1);
                setChartValue(temp2);
                setData(res.data);
            })
            .catch(err=>{
                toast.error(err.message);
            })
    }, [])
    return (
        <div className="container-fluid">
            {Object.entries(data).length &&
                <>
                    <div className="row">
                            {stat.map((item,index)=>
                                <div className="col-3 mt-4" key={index}>
                                    <StatNum data={data[item.id].stat} head={item.title} total={data[item.id].total}/>
                                </div>)}
                    </div>
                    {/* <div className="row mt-4">
                        stat.map((item,index)=>
                            <div className="col-3" key={index}>
                                <StatNum data={data[item.id].stat} head={item.title} total={data[item.id].total}/>
                            </div>)
                    </div> */}
                </>
            }
            {/* <div className="row mt-4">
                <div className="col-3">
                    <StatNum data={data} head="Students Without Teams"/>
                </div>
                <div className="col-3">
                    <StatNum data={data} head="Doctors Have Place"/>
                </div>
                <div className="col-3">
                    <StatNum data={data} head="Teacher Assistants Have Place"/>
                </div>
            </div>    */}
            <hr className="mt-5 mb-4"/> 
            {(department && chartValue) && <MyChart departments={department} data={chartValue}/>}
                

        </div>
    );
}

export default AdminStat;