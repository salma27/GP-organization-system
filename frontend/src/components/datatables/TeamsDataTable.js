import React from "react";
import data from "components/data";
import { AdminNavbar } from "components/navbar";
import { DataTable } from "utils";

const columns = [
    {
        name: "id",
        label: "ID",
        options: {
            filter: false,
        },
    },
    {
        name: "name",
        label: "Name",
        options: {
            filterType: "textField",
        },
    },
    {
        name: "email",
        label: "Mail",
        options: {
            filterType: "textField",
        },
    },
    {
        name: "major",
        label: "Department",
        options: {
            filterType: "checkbox",
        },
    },
    {
        name: "gpa",
        label: "GPA",
        options: {
            filter: false,
        },
    },
    {
        name: "team",
        label: "Team",
        options: {
            filterType: "multiselect",
        },
    },
];

function TeamsDataTable() {
    return (
        <>
            <AdminNavbar />
            <DataTable
                title="Teams List"
                data={data}
                columns={columns}
            />
        </>
    );
}

export default TeamsDataTable;
