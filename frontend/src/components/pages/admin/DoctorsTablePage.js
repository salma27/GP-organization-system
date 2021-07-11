import { DoctorsDataTable } from "components/datatables";
import { AdminNavbar } from "components/navbar";
import React from "react";

const DoctorsTablePage = () => {
    return (
        <>
            <div className="container-fluid">
                <AdminNavbar />
                <div className="p-1 border rounded">
                    <DoctorsDataTable />
                </div>
            </div>
        </>
    );
};
export default DoctorsTablePage;
