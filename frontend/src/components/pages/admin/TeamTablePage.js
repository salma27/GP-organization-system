import { TeamsDataTable } from "components/datatables";
import { AdminNavbar } from "components/navbar";
import React from "react";

const TeamTablePage = () => {
    return (
        <>
            <div className="container-fluid">
                <AdminNavbar />
                <div className="p-1 border rounded">
                    <TeamsDataTable />
                </div>
            </div>
        </>
    );
};
export default TeamTablePage;
