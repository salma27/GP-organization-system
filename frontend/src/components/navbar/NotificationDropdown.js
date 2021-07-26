import React, { useEffect, useState, Link } from "react";
import { BsCheckCircle } from "react-icons/bs";
// import { FormattedMessage } from "react-intl";
import { useRequest, useAuthContext } from "hooks";
//import { clientSubInfo } from "requests";
import moment from "moment";
import { BsTrashFill } from "react-icons/bs";
import "./NotificationDropdown.css";
import {
    RequestCard,
    NotificationRequestCard,
    NotificationCard,
} from "components/cards";
import getMyProfile from "requests/getMyProfile";
import { toast } from "react-toastify";
import {
    getStudentNotificationList,
    staffGetNotification,
    staffgetProfile,
} from "requests";

const NotificationDropdown = () => {
    const { isStaff } = useAuthContext();
    const [requestStudentID, requestingStudentID] = useRequest(
        isStaff ? staffgetProfile : getMyProfile
    );
    const [requestNotiList, requestingNotiList] = useRequest(
        isStaff ? staffGetNotification : getStudentNotificationList
    );
    const [notiList, setNotiList] = useState([]);
    useEffect(() => {
        requestNotiList()
            .then((res) => {
                setNotiList(res.data.reverse());
            })
            .catch(({ response }) => {
                toast.error(response.data.message);
                toast.error("Error loading notifications");
            });
    }, []);
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
                {notiList &&
                    notiList.map((noti) => (
                        <div key={noti.id}>
                            <a className="dropdown-item" key={noti.id}>
                                <div key={noti.id}>
                                    <NotificationCard
                                        noti={noti}
                                        key={noti.id}
                                    />
                                </div>
                            </a>
                            <hr />
                        </div>
                    ))}
                {/*<h6 className="dropdown-header">Join Requests:</h6>
                <hr />
                {requests.map((r, i) => (
                    <div key={i}>
                        <a className="dropdown-item" key={i}>
                            <div key={i}>
                                <NotificationRequestCard {...r} key={i} />
                            </div>
                        </a>
                        <hr />
                    </div>
                ))}*/}
            </div>
        </li>
    );
};

export default NotificationDropdown;
