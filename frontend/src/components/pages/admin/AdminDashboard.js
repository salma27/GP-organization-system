import { AdminNavbar } from "components/navbar";
import React from "react";
import StudentsDataTable from "./../../../components/datatables/StudentsDataTable";
import { AdminStat } from ".";

const AdminDashboard = () => {
    return (
        <>
            <div className="container-fluid">
                <AdminNavbar />
                <div className="p-1 border rounded">
                    <AdminStat />
                </div>
            </div>
        </>
    );
};
export default AdminDashboard;
