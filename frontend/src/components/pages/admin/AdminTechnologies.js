import { AdminNavbar } from "components/navbar";
import React, { useState } from "react";
import { TechnologiesDataTable } from "components/datatables";

const AdminTechnologies = () => {
    return ( 
        <>
            <div className="container-fluid">
                <AdminNavbar />
                <div className="p-1 border rounded">
                    <TechnologiesDataTable />
                </div>
            </div>
        </>
    );
}
 
export default AdminTechnologies;