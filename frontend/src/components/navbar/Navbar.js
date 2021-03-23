import React from "react";
import NotificationDropdown from "./NotificationDropdown";

const Navbar = ({onClick}) => {
    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {onClick && (
                <button
                    id="sidebarToggleTop"
                    className="btn btn-link d-md-none rounded-circle mr-3"
                    onClick={onClick}
                >
                    <i className="fa fa-bars"></i>
                </button>
            )}

            <ul className="navbar-nav ml-auto">
                <li className="nav-item d-flex justify-content-center align-items-center">
                    <span className="mr-2 d-none d-lg-inline text-gray-600">
                        user.username
                    </span>
                </li>
                <NotificationDropdown />
            </ul>
        </nav>
    );
};
export default Navbar;
