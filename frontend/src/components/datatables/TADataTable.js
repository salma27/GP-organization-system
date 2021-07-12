import React from "react";
import MUIDataTable from "mui-datatables";
import { data } from "./../data/data";
import { AdminNavbar } from "components/navbar";
import { DataTable } from "utils";

const columns = [
    { name: "ID", options: { display: "excluded", filter: false } },
    { name: "Name", options: { filterType: "textField" } },
    { name: "Mail", options: { filterType: "textField" } },
    { name: "Department", options: { filterType: "checkbox" } },
    { name: "GPA", options: { display: "excluded", filter: false } },
    { name: "Team", options: { display: "excluded", filter: false } },
];

function TADataTable() {
    return (
        <>
            <DataTable title={"TAs List"} data={data} columns={columns} />
        </>
    );
}

export default TADataTable;
