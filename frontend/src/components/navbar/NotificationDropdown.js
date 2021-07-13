import React, { useEffect, useState, Link } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import "./NotificationDropdown.css";
import { RequestCard, NotificationRequestCard } from "components/cards";

const NotificationDropdown = () => {
    const requests = [
        {
            name: "Alen douglas",
            join: true,
        },
        {
            name: "Mike mikey",
            join: true,
        },
        {
            name: "Ali kory",
            join: false,
        },
        {
            name: "My name",
            join: false,
        },
        {
            name: "Tarzan",
            join: true,
        },
        {
            name: "Elsa",
            join: false,
        },
    ];

    return (
        <li className="nav-item dropdown no-arrow mx-1">
            <a
                className="nav-link dropdown-toggle"
                href="#"
                id="alertsDropdown"
                role="button"
                data-toggle="dropdown"
                data-target="#noti"
            >
                <i className="fas fa-bell fa-fw"></i>

                <span className="badge badge-danger badge-counter">new</span>
            </a>
            <div
                className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="alertsDropdown"
                id="noti"
                style={{
                    width: "310px",
                    height: "500px",
                    overflowY: "auto",
                }}
            >
                <h6
                    className="font-weight-bold text-info d-flex justify-content-center text-center"
                    id="notifications"
                >
                    Notifications
                </h6>
                <hr />
                <h6 className="dropdown-header">Join Requests:</h6>
                <hr />

                {requests.map((r, i) => (
                    <>
                        <a className="dropdown-item " href="#">
                            <div>
                                <NotificationRequestCard {...r} key={i} />
                            </div>
                        </a>
                        <hr />
                    </>
                ))}
            </div>
        </li>
    );
};

export default NotificationDropdown;
