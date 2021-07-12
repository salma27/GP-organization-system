import React, { useEffect, useState, Link } from "react";
import { BsCheckCircle } from "react-icons/bs";
// import { FormattedMessage } from "react-intl";
import { useRequest } from "hooks";
//import { clientSubInfo } from "requests";
import moment from "moment";
import { BsTrashFill } from "react-icons/bs";
// import {FaTimes} from "react-icons/fa";
import "./NotificationDropdown.css";
const NotificationDropdown = () => {
    //const [getSubInfo] = useRequest(clientSubInfo);
    //const [getSubInfo] = useRequest();
    const [renewal, setRenewal] = useState(0);
    const [planId, setPlanId] = useState("FREE");
    /*
    useEffect(() => {
        getSubInfo()
            .then((r) => {
                const { renewal_date, plan_id } = r.data.data.subscriptions[0];
                setRenewal(moment(renewal_date).diff(moment(), "days"));
                setPlanId(plan_id);
            })
            .catch((e) => {})
            .finally(() => {});
    }, []);
*/
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
                {renewal <= 0 && (
                    <span className="badge badge-danger badge-counter">
                        new
                    </span>
                )}
            </a>
            <div
                className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="alertsDropdown"
                id="noti"
            >
                <h6 className="dropdown-header" id="notifications">
                    Notifications
                    {/*<FormattedMessage
                        id="notifications"
                        defaultMessage="Notifications"
                    />*/}
                </h6>
                {/* <Link
                    className="dropdown-item d-flex align-items-center"
                    //to={editProfileRoute}
                >
                    <div className="mr-3">
                        <div className="icon-circle bg-primary">
                             <TiPencil className="text-white" size="1.5em" />
                        </div>
                    </div>
                    <div className="text-gray-500">
                         <FormattedMessage
                            id="edit_profile"
                            defaultMessage="Edit profile"
                       />
                    </div>
                </Link>
               */}
                {renewal >= 0 && (
                    <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                    >
                        <div className="mr-3">
                            {renewal <= 30 ? (
                                <div className="icon-circle bg-danger">
                                    <i className="fas fa-exclamation-triangle text-white" />
                                </div>
                            ) : (
                                <div className="icon-circle bg-success">
                                    <BsCheckCircle
                                        className="text-white"
                                        size="1.5em"
                                    />{" "}
                                </div>
                            )}
                        </div>
                        <div>
                            {planId === "FREE" ? (
                                <div className="text-gray-500">
                                    {/*  <FormattedMessage
                                        id="all_set"
                                        defaultMessage="You are all set"
                                  />*/}
                                </div>
                            ) : (
                                <div className="text-gray-500">
                                    {/* <FormattedMessage
                                        id="remaining"
                                        defaultMessage="Remaining days until renewal:"
                                    />{" "}
                                    {renewal / (30 * 12) < 100 ? (
                                        <b>{renewal}</b>
                                    ) : (
                                        <FormattedMessage
                                            id="never"
                                            defaultMessage="Never"
                                        />
                                    )} */}
                                </div>
                            )}
                        </div>
                    </a>
                )}
                {renewal < 0 && renewal >= -14 && (
                    <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                    >
                        <div className="mr-3">
                            <div className="icon-circle bg-danger">
                                <i className="fas fa-exclamation-triangle text-white" />
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-500">
                                {/* <FormattedMessage
                                    id="remaining_til_expiration"
                                    defaultMessage="Remaining days until expiration:"
                                />{" "} */}
                                <b>{renewal + 14}</b>
                            </div>
                        </div>
                    </a>
                )}
                {renewal < -14 && renewal >= -45 && (
                    <a
                        className="dropdown-item d-flex align-items-center"
                        href="#"
                    >
                        <div className="mr-3">
                            <div className="icon-circle bg-danger">
                                <BsTrashFill
                                    className="text-white"
                                    size="1.5em"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-500">
                                {/* <FormattedMessage
                                    id="remaining_til_dataloss"
                                    defaultMessage="Remaining days until data loss:"
                                />{" "} */}
                                <b>{renewal + 45}</b>
                            </div>
                        </div>
                    </a>
                )}
            </div>
        </li>
    );
};

export default NotificationDropdown;

/*
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
*/
