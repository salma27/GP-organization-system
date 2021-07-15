import { AdminNavbar } from "components/navbar";
import React from "react";
import { AdminRulesCard } from "components/cards";

const AdminRules = () => {
    return (
        <>
            <div className="container-fluid">
                <AdminNavbar />
                <div className="p-1 border rounded">
                    <AdminRulesCard />
                </div>
            </div>
        </>
    );
};
export default AdminRules;
