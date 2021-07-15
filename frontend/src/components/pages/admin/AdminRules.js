import { AdminNavbar } from "components/navbar";
import React from "react";
import { RulesDataTable } from "components/datatables";

const AdminRules = () => {
    return (
        <>
            <div className="container-fluid">
                <AdminNavbar />
                <div className="p-1 border rounded">
                    <RulesDataTable />
                </div>
            </div>
        </>
    );
};
export default AdminRules;
