import { AdminNavbar } from "components/navbar";
import React from "react";
import "styles/stickey.css";
import { Redirect, Route, Switch } from "react-router";
import * as r from "routes/routes";
import * as pages from "./";

const AdminDashboardTabs = () => {
    const style = {};
    return (
        <div className="container-fluid h-100" style={style}>
            <div className="row">
                <div className="col">
                    <AdminNavbar />
                </div>
            </div>
        </div>
    );
};
export default AdminDashboardTabs;
