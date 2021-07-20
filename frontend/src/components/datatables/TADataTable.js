import React, { useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import { data } from "./../data/data";
import { AdminNavbar } from "components/navbar";
import { DataTable } from "utils";
import { useRequest} from "hooks";
import { adminGetTas } from 'requests';
import { toast } from "react-toastify";

const columns = [
    // { name: "ID", options: { display: "excluded", filter: false } },
    { name: "name", label: "Name", options: { filterType: "textField" } },
    { name: "ecomId", label: "Ecom ID", options: { filterType: "textField" } },
    { name: "department", label: "Department", options: { filterType: "checkbox" } },
    { name: "password", label:"password", options: { display: "excluded", filter: true } },
    { name: "teamsSlots", label:"Team Of Slots", options: { filter: false } },
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

function TADataTable() {
    const [request,requesting] = useRequest(adminGetTas);
    const [data,setData] = useState([])

    useEffect(() => {
        request()
            .then((res)=>{
                setData(res.data.supervisors);
            })
            .catch((err)=>{
                toast.error("Couldn't get Teaching Assistants")
            })
    }, [])

    return (
        <>
            <DataTable loading={requesting} title={"TAs List"} data={data} columns={columns} />
        </>
    );
}

export default TADataTable;
