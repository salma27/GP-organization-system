import React from "react";
import NotificationDropdown from "./NotificationDropdown";
import { SearchBar } from "components/SearchBar";
import { Link } from "react-router-dom";
import * as r from "routes/routes";
import { Nav, Navbar, Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import { MdExpandMore } from "react-icons/md";
import { AiOutlinePoweroff } from "react-icons/ai";

const Navbar_ = ({ filled }) => {
    let style = filled ? { color: "white", backgroundColor: "#00bfa6" } : {};
    style = { ...style, borderRadius: "2rem" };
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Logout
        </Tooltip>
    );
    return (
        <Navbar expand="lg" style={style} className="pl-4 pl-lg-5">
            <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                className="bg-white"
            >
                <MdExpandMore />
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <SearchBar />
                <Nav className="ml-auto">
                    <Nav.Item className="my-md-auto mx-2">
                        <Link to={r.newsFeedRoute}>News Feed</Link>
                    </Nav.Item>
                    <Nav.Item className="my-md-auto mx-2">
                        <Link to={r.oldProjectsRoute}>Old Ideas</Link>
                    </Nav.Item>
                    <Nav.Item className="my-md-auto mx-2">
                        <Link to={r.loginRoute}>login</Link>
                    </Nav.Item>
                    <Nav.Item className="my-md-auto mx-2">
                        <Link to={r.staffProfileRoute}>Dr</Link>
                    </Nav.Item>
                    <Nav.Item className="my-md-auto mx-2">
                        <Link to={r.studentProfileRoute}>username</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <NotificationDropdown
                            class="artboard t-material-light"
                            id="artboard-1"
                        />
                    </Nav.Item>
                    <Nav.Item className="my-md-auto mx-2">
                        <Link to={r.loginRoute}>
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 0, hide: 0 }}
                                overlay={renderTooltip}
                            >
                                <AiOutlinePoweroff />
                            </OverlayTrigger>
                        </Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
export default Navbar_;
