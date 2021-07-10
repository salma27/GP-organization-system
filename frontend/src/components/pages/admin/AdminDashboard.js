import { AdminNavbar } from "components/navbar";
import React from "react";
import StudentsDataTable from "./../../../components/datatables/StudentsDataTable";

const AdminDashboard = () => {
    return (
        <>
            <AdminNavbar />
            <StudentsDataTable />
        </>
    );
};
export default AdminDashboard;
