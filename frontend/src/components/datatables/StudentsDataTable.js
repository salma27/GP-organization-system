import { Button, Form, Col, Row } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { AdminNavbar } from "components/navbar";
import { DataTable } from "utils";
import { adminGetStudents } from "requests";
import { useRequest } from 'hooks';
import { toast } from "react-toastify";

const columns = [
    { name: "ecomId", label:"Ecom ID", options: { filter: "textfield" } },
    { name: "name", label:"Name", options: { filter: "textfiled" } },
    { name: "bio", label:"bio", options: { display: "excluded", filter: false } },
    { name: "departmentId", label:"Department", options: { filterType: "checkbox" } },
    // { name: "GPA", options: { filter: false } },
    { name: "teamId", options: { filterType: "multiselect" } },
    { name: "technologyIds", options: { display: "excluded", filter: false } },

    
];

function StudentsDataTable() {
    const [request,requesting] = useRequest(adminGetStudents);
    // const [deleteRequest, DeleteRequesting] = useRequest();
    const [data,setData] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        request({})
            .then(response=>{
                // console.log(response.data);
                setData(response.data.students)
            })
            .catch(error=>{
                toast.error("Couldn't get students");
            })
    }, [])

    return (
        <>
            <DataTable title={"Students List"} loading={requesting} data={data} columns={columns} />
        </>
    );
}

export default StudentsDataTable;
