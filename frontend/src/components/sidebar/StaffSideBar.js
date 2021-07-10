import React from "react";
import {NavLink} from "react-router-dom";
import "./profile.css";
import {AiOutlinePoweroff} from "react-icons/ai";
import {IoPeopleCircle} from "react-icons/io5";
import {FaBars, FaNetworkWired} from "react-icons/fa";
import {BsChatSquareQuote} from "react-icons/bs";
import {RiProfileLine} from "react-icons/ri";
import {useLogout, useRequest} from "hooks";
import {LoginImg, SpinnerButton} from "utils";
import * as r from "routes/routes";

const ProfileSidebar = () => {
    const {logout} = useLogout();
    const [request, requesting] = useRequest(() => {});

    return (
        <nav id="sidebar" className="navbar-expand-lg">
            <div className="sidebar-header">
                <div className="d-flex" style={{"alignItems":"center"}}>
                    <LoginImg
                        width="50px"
                        height="40px"
                        color1="black"
                        color2="light-gray"
                    />
                    <h3 className="ml-2 mb-0">GP Organizer</h3>
                </div>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon">
                        <FaBars />
                    </span>
                </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <ul className="list-unstyled components w-100">
                    <li>
                        <NavLink to={r.staffSupervisedProjectsRoute}>
                            <IoPeopleCircle />
                            My Teams
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={r.staffProjects}>
                            <FaNetworkWired />
                            My Projects
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={r.staffAllProjects}>
                            <IoPeopleCircle />
                            All Projects
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={r.staffRequests}>
                            <BsChatSquareQuote />
                            Requests
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={r.staffProfileRoute}>
                            <RiProfileLine />
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <div className="text-center w-100 d-inline-block px-3 mt-3">
                            <SpinnerButton
                                className="btn btn-outline-light w-100"
                                onClick={() => logout(request)}
                                loading={requesting}
                            >
                                <AiOutlinePoweroff className="mr-md-1" />
                                Logout
                            </SpinnerButton>
                        </div>
                    </li>
                </ul>
            </div>
            {/* <hr /> */}
        </nav>
    );
};

export default ProfileSidebar;