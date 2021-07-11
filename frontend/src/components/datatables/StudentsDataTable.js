import { Button, Form, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { data } from "./../data/data";
import { AdminNavbar } from "components/navbar";

const columns = ["ID", "Name", "Mail", "Major", "GPA", "Team"];

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
            <MUIDataTable
                title={"Students List"}
                data={data}
                columns={columns}
                options={options}
            />
        </>
    );
}

export default StudentsDataTable;
