import React from "react";
import MUIDataTable from "mui-datatables";
import { data } from "./../data/data";

const columns = [
    { name: "ID", options: { display: false } },
    "Name",
    "Mail",
    "Department",
    { name: "GPA", options: { display: false } },
    { name: "Team", options: { display: false } },
];

const options = {
    filterType: "checkbox",
};

function TADataTable() {
    return (
        <>
            <div>
                <MUIDataTable
                    title={"TAs List"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </div>
        </>
    );
}

export default TADataTable;
