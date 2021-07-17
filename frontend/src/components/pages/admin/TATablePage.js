import { TADataTable } from "components/datatables";
import { AdminNavbar } from "components/navbar";
import React from "react";

const TATablePage = () => {
    return (
        <>
            <div className="container-fluid">
                <AdminNavbar />
                <div className="p-1 border rounded">
                    <TADataTable />
                </div>
            </div>
        </>
    );
};
export default TATablePage;
