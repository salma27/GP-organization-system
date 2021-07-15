import { Button, Form, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { data } from "./../data/data";
import { DataTable } from "utils";
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
    const data = [
        ["CS", "3", "5", "1", "2", "1", "1"],
        ["IS", "2", "5", "1", "2", "1", "1"],
        ["IT", "4", "5", "1", "2", "1", "1"],
        ["DS", "1", "5", "2", "3", "1", "1"],
    ];
    const columns = [
        { name: "Department", options: { filterType: "checkbox" } },
        { name: "Min students per team" },
        { name: "Max students per team" },
        { name: "Min doctors to supervise" },
        { name: "Max doctors to supervise" },
        { name: "Min TAs per team" },
        { name: "Max TAs per team" },
    ];
    return (
        <>
            <DataTable title={"Students List"} data={data} columns={columns} />
        </>
    );
}

export default RulesDataTable;
