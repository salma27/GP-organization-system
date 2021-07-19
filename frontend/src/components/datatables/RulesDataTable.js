import { Button, Form, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { data } from "./../data/data";
import { DataTable } from "utils";
import { useDepartments } from "hooks";
/*
const columns = [
    { name: "ID", options: { filter: "textfield" } },
    { name: "Name", options: { filter: "textfiled" } },
    { name: "Mail", options: { filter: "textfiled" } },
    { name: "Major", options: { filterType: "checkbox" } },
    { name: "GPA", options: { filter: false } },
    { name: "Team", options: { filterType: "multiselect" } },
];
*/
function RulesDataTable() { 
    const [data,loading] = useDepartments();

    // const data1 = [
    //     ["CS", "3", "5", "1", "2", "1", "1"],
    //     ["IS", "2", "5", "1", "2", "1", "1"],
    //     ["IT", "4", "5", "1", "2", "1", "1"],
    //     ["DS", "1", "5", "2", "3", "1", "1"],
    // ];
    const columns = [
        { name: "name", label:"Department", options: { filterType: "checkbox" } },
        { name: "minNumberOfStudents", label:"Min students per team" },
        { name: "maxNumberOfStudents", label:"Max students per team" },
        { name: "minNumberOfSupervisors", label:"Min supervisors to supervise" },
        { name: "maxNumberOfSupervisors", label:"Max supervisors to supervise" },
    ];
    return (
        <>
            <DataTable title={"Students List"} loading={loading} data={data} columns={columns} />
        </>
    );
}

export default RulesDataTable;
