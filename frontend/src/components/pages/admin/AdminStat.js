import React, {useState, useEffect} from 'react';
import "./../../../css/adminStat.css";
import {StatNum,MyChart} from "./../../cards";
import { AdminGetStat } from "requests";
import { useRequest } from "hooks";
import { toast } from "react-toastify";

const AdminStat = () => {
    const [data,setData] = useState({});
    const [request,requesting] = useRequest(AdminGetStat);
    const [department,setDepartment] = useState([]);
    const [chartValue,setChartValue] = useState([]);
    // const [departments,setdepartments] = useState([]);

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
                let tempDepartments = [];
                // Object.entries(res.data.departments).map(ele=>{
                //     tempDepartments.push(ele[1]);
                // })
                
                res.data.teamStat.stat.map(ele =>{
                    temp1.push(ele.name);
                    temp2.push(ele.count);
                })
                // console.log(temp1,temp2);
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
                </>
            }
            
            <hr className="mt-5 mb-4"/> 
            {(department && chartValue) && <MyChart departments={department} data={chartValue}/>}
                

        </div>
    );
}

export default AdminStat;