import {Navbar} from "components/navbar";
import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import * as r from "routes/routes";
import "./sidebar.css";
import {GoSettings, GoThreeBars} from "react-icons/go";
import {BiTransferAlt} from "react-icons/bi";
import {FaUsersCog, FaMoneyCheck} from "react-icons/fa";
import {FiUsers} from "react-icons/fi";
import {
    AiOutlineArrowRight,
    AiOutlineArrowLeft,
    AiOutlinePoweroff,
} from "react-icons/ai";
import {
    EDIT_STRIPE_KEYS,
    LIST_CLIENTS,
    LIST_SUBSCRIPTIONS,
    LIST_TRANSACTIONS,
    SUPER_ADMIN,
    UPDATE_SMTP_DETAILS,
    VIEW_LOGS,
} from "config/privilege";
import {useLogout, usePrivilege, useRequest} from "hooks";
import {logoutRequest} from "requests";
import {SpinnerButton} from "utils";

const AdminSideBar = ({children}) => {
    const [toggle, setToggle] = useState(false);
    const {canAccess} = usePrivilege();
    const {logout} = useLogout();
    const [request, requesting] = useRequest(logoutRequest);

    useEffect(() => {
        document.getElementById("sidebar").classList.toggle("active");
    }, [toggle]);

    const toggleHandler = (e) => {
        e.preventDefault();
        setToggle(!toggle);
    };
    return (
        <div id="wrapper">
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>PointX</h3>
                    <strong>PX</strong>
                </div>

                <ul className="list-unstyled components">
                    {/* <li>
                        <NavLink exact to={r.adminDashboard}>
                            <GoDashboard />
                            Dashboard
                        </NavLink>
                    </li> */}
                    {canAccess(SUPER_ADMIN) && (
                        <li>
                            <NavLink to={r.adminManagers}>
                                <FaUsersCog />
                                Managers
                            </NavLink>
                        </li>
                    )}
                    {canAccess(LIST_SUBSCRIPTIONS) && (
                        <li>
                            <NavLink to={r.adminSubscriptionPlans}>
                                <FaMoneyCheck />
                                Subscription Plans
                            </NavLink>
                        </li>
                    )}
                    {canAccess(LIST_CLIENTS) && (
                        <li>
                            <NavLink to={r.adminClients}>
                                <FiUsers />
                                Clients
                            </NavLink>
                        </li>
                    )}
                    {canAccess(LIST_TRANSACTIONS) && (
                        <li>
                            <NavLink to={r.adminTransactions}>
                                <BiTransferAlt />
                                Transactions
                            </NavLink>
                        </li>
                    )}
                    {/* <li>
                        <NavLink to={r.adminPointXVersions}>
                            <GoVersions />
                            PX Versions
                        </NavLink>
                    </li> */}
                    {canAccess(VIEW_LOGS) && (
                        <li>
                            <NavLink to={r.adminLogsView}>
                                <GoThreeBars />
                                Logs
                            </NavLink>
                        </li>
                    )}

                    {!(
                        !canAccess(EDIT_STRIPE_KEYS) &&
                        !canAccess(UPDATE_SMTP_DETAILS)
                    ) && (
                        <li>
                            <NavLink to={r.adminGlobalSettings}>
                                <GoSettings />
                                Settings
                            </NavLink>
                        </li>
                    )}
                </ul>

                <div className="text-center d-none w-100 d-md-inline-block px-3">
                    <button
                        className="btn btn-light w-100"
                        onClick={toggleHandler}
                    >
                        {toggle ? (
                            <AiOutlineArrowLeft />
                        ) : (
                            <AiOutlineArrowRight />
                        )}
                    </button>
                    <hr />
                </div>
                <div className="text-center w-100 d-inline-block px-3">
                    <SpinnerButton
                        className="btn btn-outline-light w-100"
                        onClick={() => logout(request)}
                        loading={requesting}
                    >
                        <AiOutlinePoweroff
                            className={toggle ? "mr-md-1" : ""}
                        />
                        {toggle && "Logout"}
                    </SpinnerButton>
                </div>
            </nav>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar onClick={toggleHandler} />
                    {/* <div className="text-center d-md-none d-inline px-3">
                        <button className="btn btn-light w-100" onClick={toggleHandler}>
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </div> */}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminSideBar;
