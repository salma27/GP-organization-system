import { Button, Form, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { data } from "./../data/data";
import { AdminNavbar } from "components/navbar";
import { DataTable } from "utils";

const columns = [
    { name: "ID", options: { filter: "textfield" } },
    { name: "Name", options: { filter: "textfiled" } },
    { name: "Mail", options: { filter: "textfiled" } },
    { name: "Major", options: { filterType: "checkbox" } },
    { name: "GPA", options: { filter: false } },
    { name: "Team", options: { filterType: "multiselect" } },
];

function StudentsDataTable() {
    return (
        <>
            <DataTable title={"Students List"} data={data} columns={columns} />
        </>
    );
}

export default StudentsDataTable;
