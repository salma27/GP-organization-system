import { AdminNavbar } from "components/navbar";
import React, { useState } from "react";
import { CurrentProjectDataTable } from "components/datatables";

const AdminProjects = () => {
    const [showModal, setShowModal] = useState(false);

    return ( 
        <>
            <div className="container-fluid">
                <AdminNavbar />
                <div className="p-1 border rounded">
                    <CurrentProjectDataTable />
                </div>
            </div>
        </>
    );
}
 
export default AdminProjects;