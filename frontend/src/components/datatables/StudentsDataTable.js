import { Button, Form, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import MUIDataTable from "mui-datatables";

const columns = ["Name", "Company", "City", "State"];

const data = [
 ["Joe James", "Test Corp", "Yonkers", "NY"],
 ["John Walsh", "Test Corp", "Hartford", "CT"],
 ["Bob Herm", "Test Corp", "Tampa", "FL"],
 ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
  filterType: 'checkbox',
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
