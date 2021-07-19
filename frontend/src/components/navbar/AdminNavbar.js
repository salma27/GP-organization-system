import React from "react";
import NotificationDropdown from "./NotificationDropdown";
import { SearchBar } from "components/SearchBar";
import { Link } from "react-router-dom";
import * as r from "routes/routes";
import {
    Nav,
    Navbar,
    Tooltip,
    OverlayTrigger,
    Button,
    Form,
} from "react-bootstrap";
import { MdExpandMore } from "react-icons/md";
import { AiOutlinePoweroff } from "react-icons/ai";
import { Title } from "utils";

const AdminNavbar = ({ filled }) => {
    let style = filled ? { color: "white", backgroundColor: "#00bfa6" } : {};
    style = { ...style, borderRadius: "2rem" };
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Logout
        </Tooltip>
    );
    return (
        <Navbar expand="lg" style={style} className="pl-4 pl-lg-5">
            <Navbar.Collapse id="basic-navbar-nav">
                <div>
                    <Form.Label>
                        <Nav.Item>
                            <Link to={r.adminDashboard}>
                                Admin Control Center
                            </Link>
                        </Nav.Item>
                    </Form.Label>
                </div>
                <Nav className="ml-auto">
                    <Nav.Item className="my-md-auto mx-2">
                        <Link to={r.adminRules}>Rules</Link>
                        <Link to={r.adminOldProjects}>Old Projects</Link>
                    </Nav.Item>
                    <Nav.Item className="my-md-auto mx-2">
                        <Link to={r.adminProjects}>Current Projects</Link>
                    </Nav.Item>
                    <Nav.Item className="my-md-auto mx-2">
                        <Link to={r.adminNewsFeed}>News Feed</Link>
                    </Nav.Item>
                    <Nav.Item className="my-md-auto mx-2">
                        <Link to={r.studentsDataTable}>Students</Link>
                    </Nav.Item>
                    <Nav.Item className="my-md-auto mx-2">
                        <Link to={r.teamsDataTable}>Teams</Link>
                    </Nav.Item>
                    <Nav.Item className="my-md-auto mx-2">
                        <Link to={r.taDataTable}>TAs</Link>
                    </Nav.Item>
                    <Nav.Item className="my-md-auto mx-2">
                        <Link to={r.doctorsDataTable}>Doctors</Link>
                    </Nav.Item>

                    <Nav.Item className="my-md-auto mx-2">
                        <Link to={r.adminLoginRoute}>
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
export default AdminNavbar;
