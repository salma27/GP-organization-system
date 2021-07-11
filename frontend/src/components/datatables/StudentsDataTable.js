import { Button, Form, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { data } from "./../data/data";
const columns = [
    { name: "ID", options: { display: false } },
    "Name",
    "Mail",
    "Major",
    "GPA",
    "Team",
];
/*
const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
];
*/
const options = {
    //hasIndex: true /* <-- use numbers for rows*/,
    //customAction: action /* <-- use action button for row */,
    //searchBox: true /* <-- search true or false */,
    csv: true /* <-- csv download true or false */,

    filterType: "checkbox",
};

function StudentsDataTable() {
    return (
        <>
            <div>
                <MUIDataTable
                    title={"Students List"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </div>
        </>
    );
}

export default StudentsDataTable;
