import { OldProjectsTable } from "components/datatables";
import { AdminNavbar } from "components/navbar";
import React from "react";

const AdminOldProjects = () => {
    return (
        <>
            <div className="container-fluid">
                <AdminNavbar />
                <div className="p-1 border rounded">
                    <OldProjectsTable />
                </div>
            </div>
        </>
    );
};
export default AdminOldProjects;
