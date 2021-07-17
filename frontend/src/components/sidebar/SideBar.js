import { Navbar } from "components/navbar";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
// import "./sidebar.css";
import {
    AiOutlineArrowRight,
    AiOutlineArrowLeft,
    AiOutlinePoweroff,
} from "react-icons/ai";
import { IoPeopleCircle } from "react-icons/io5";
import { FaNetworkWired } from "react-icons/fa";
import { BsChatSquareQuote } from "react-icons/bs";
import { RiProfileLine } from "react-icons/ri";
import { useLogout, useRequest } from "hooks";
import { LoginImg, SpinnerButton } from "utils";
import * as r from "routes/routes";

const SideBar = ({ children }) => {
    const [toggle, setToggle] = useState(false);
    const { logout } = useLogout();
    const [request, requesting] = useRequest(() => {});

    const toggleBarOnChange = () => {
        // Automatically close on phones
        if (window.innerWidth < 720) {
            doToggle();
        }
    };

    useEffect(() => {
        if (window.innerWidth > 720) {
            doToggle();
        }
    }, []);

    const doToggle = () => {
        const element = document.getElementById("sidebar");
        if (typeof element !== "undefined") {
            element.classList.toggle("active");
        }
    };

    useEffect(() => {
        doToggle();
    }, [toggle]);

    const history = useHistory();
    useEffect(() => {
        const unlisten = history.listen(() => {
            toggleBarOnChange();
        });
        return () => {
            unlisten();
        };
    }, []);

    const toggleHandler = (e) => {
        e.preventDefault();
        setToggle(!toggle);
    };

    return (
        <div id="wrapper">
            <nav id="sidebar" className="active">
                <div className="sidebar-header">
                    <LoginImg
                        width="50px"
                        height="40px"
                        color1="white"
                        color2="light-gray"
                    />
                    <h3>GP Organizer</h3>
                    <strong>GP</strong>
                </div>

                <ul className="list-unstyled components">
                    <li>
                        <NavLink to={r.studentTeamRoute}>
                            <IoPeopleCircle />
                            Team Info
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={r.studentProjectsRoute}>
                            <FaNetworkWired />
                            Team Projects
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={r.studentRequestsRoute}>
                            <BsChatSquareQuote />
                            Requests
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={r.studentProfileRoute}>
                            <RiProfileLine />
                            Profile
                        </NavLink>
                    </li>
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
                        Logout
                    </SpinnerButton>
                </div>
            </nav>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar onClick={toggleHandler} multilingual />
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
