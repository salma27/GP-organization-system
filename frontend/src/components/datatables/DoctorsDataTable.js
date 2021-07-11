import React from "react";
import MUIDataTable from "mui-datatables";
import { data } from "./../data/data";
import { AdminNavbar } from "components/navbar";

const columns = [
    { name: "ID", options: { display: "excluded" } },
    "Name",
    "Mail",
    "Department",
    { name: "GPA", options: { display: "excluded" } },
    { name: "Team", options: { display: "excluded" } },
];

const options = {
    filterType: "checkbox",
};

function DoctorsDataTable() {
    return (
        <>
            <AdminNavbar />
            <MUIDataTable
                title={"Doctors List"}
                data={data}
                columns={columns}
                options={options}
            />
        </>
    );
}

export default DoctorsDataTable;
