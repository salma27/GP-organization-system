import { AdminNavbar } from "components/navbar";
import React from "react";
import StudentsDataTable from "./../../../components/datatables/StudentsDataTable";
import {AdminStat} from"."

const AdminDashboard = () => {
    return (
        <>
            <AdminNavbar />

            <AdminStat />
        </>
    );
};
export default AdminDashboard;
