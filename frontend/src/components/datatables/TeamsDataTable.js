import React from "react";
import MUIDataTable from "mui-datatables";
import { data } from "./../data/data";
import { AdminNavbar } from "components/navbar";

const columns = ["ID", "Name", "Mail", "Department", "GPA", "Team"];

const options = {
    filterType: "dropdown",
};

function TeamsDataTable() {
    return (
        <>
            <AdminNavbar />
            <MUIDataTable
                title={"Teams List"}
                data={data}
                columns={columns}
                options={options}
            />
        </>
    );
}

export default TeamsDataTable;
