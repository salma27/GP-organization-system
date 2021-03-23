import React from "react";

const NotificationDropdown = () => {
    return (
        <li className="nav-item dropdown no-arrow mx-1">
            <a
                className="nav-link dropdown-toggle"
                href="#"
                id="alertsDropdown"
                role="button"
                data-toggle="dropdown"
                data-target="#noti"
                aria-haspopup="true"
            >
                <i className="fas fa-bell fa-fw"></i>
            </a>
            <div
                className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="alertsDropdown"
                id="noti"
            >
                <h6 className="dropdown-header">Notifications</h6>
                <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="mr-3">
                        <div className="icon-circle bg-danger">
                            <i className="fas fa-exclamation-triangle text-white" />
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-500">Message</div>
                    </div>
                </a>
            </div>
        </li>
    );
};

export default NotificationDropdown;
