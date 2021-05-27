import { React, Component, useCallback, useState } from "react";
import NotificationIcon from "./NotificationIcon";
import ReactDOM from "react-dom";
//import NotifyMe from "react-notification-timeline";

const Notification = ({ count, mute, isAnimating }) => {
    return (
        <>
            <div
                className={`notification-bell ${
                    isAnimating ? "is-animating" : ""
                } ${mute ? "is-muted" : ""}`}
                data-count={count > 9 ? "9+" : count}
            >
                <NotificationIcon />
            </div>
        </>
    );
};
export default Notification;
