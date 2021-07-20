import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
// import { data } from "./../data/data";
import { AdminNavbar } from "components/navbar";
import { DataTable } from "utils";
import { useRequest } from "hooks";
import { adminGetDoctors } from "requests";
import { toast } from "react-toastify";

const columns = [
    { name: "id", options: { display: "excluded", filter: false } },
    { name: "name", label:"Name", options: { filterType: "textField" } },
    { name: "ecomId", label:"ECom ID", options: { filterType: "textField" } },
    { name: "department", label:"Department", options: { filterType: "checkbox" } },
    // { name: "GPA", options: { display: "excluded", filter: false } },
    { name: "teamsSlots", label:"Team Of Slots", options: { filter: true } },
    { name: "teams", label:"Teams Taken",
        options: { 
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <div>{value && value.map((v,i)=> v + ", ")}</div>
                );
            },
        } ,
    },
];

function DoctorsDataTable() {
    const [request,requesting] = useRequest(adminGetDoctors);
    const [data,setData] = useState([]);

    useEffect(() => {
        request()
            .then(response=>{
                console.log(response.data.supervisors);
                setData(response.data.supervisors)
            })
            .catch(error=>{
                toast.error("Couldn't get doctors");
            })
    }, [])

    return (
        <>
            <DataTable loading={requesting} title={"Doctors List"} data={data} columns={columns} />
        </>
    );
}

export default DoctorsDataTable;
