import React from "react";
import NotificationDropdown from "./NotificationDropdown";
import {SearchBar} from "components/SearchBar";
import {Link} from "react-router-dom";
import * as r from "routes/routes";
import {Nav, Navbar} from "react-bootstrap";
import {MdExpandMore} from "react-icons/md";

const Navbar_ = ({onClick}) => {
    return (
        <Navbar bg="white" expand="lg">
            {onClick && (
                <button
                    id="sidebarToggleTop"
                    className="btn btn-link d-md-none rounded-circle mr-3"
                    onClick={onClick}
                    style={{color: "#00BFA6"}}
                >
                    <i className="fa fa-bars"></i>
                </button>
            )}
            <Navbar.Toggle aria-controls="basic-navbar-nav">
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
                        <Link to={r.studentProfileRoute}>username</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <NotificationDropdown />
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
export default Navbar_;
