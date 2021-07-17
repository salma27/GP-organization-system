import { StudentsDataTable } from "components/datatables";
import { AdminNavbar } from "components/navbar";
import React from "react";

const StudentsTablePage = () => {
    return (
        <>
            <div className="container-fluid">
                <AdminNavbar />
                <div className="p-1 border rounded">
                    <StudentsDataTable />
                </div>
            </div>
        </>
    );
};
export default StudentsTablePage;
