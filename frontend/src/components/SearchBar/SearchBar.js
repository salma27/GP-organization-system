import React, { useState } from "react";
import "./SearchBar.css";
import ErrorHandlingInput from "../../utils/ErrorHandlingInput";
//import { Button } from "utils";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { LoginImg } from "utils";

function SearchBar() {
    const [search, setSearch] = useState("Search...");
    return (
        <>
            <script
                src="https://unpkg.com/react/umd/react.production.min.js"
                crossorigin
            ></script>

            <script
                src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
                crossorigin
            ></script>

            <script
                src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
                crossorigin
            ></script>

            <script>var Alert = ReactBootstrap.Alert;</script>
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                crossorigin="anonymous"
            />
            <Navbar
                className="navbar-custom"
                variant="light"
                expand="lg"
                sticky="top"
            >
                <LoginImg
                    width="50px"
                    height="40px"
                    color1="white"
                    color2="light-gray"
                />
                <Navbar.Brand href="#home">Personal Profile</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Newsfeeds</Nav.Link>
                        <Nav.Link href="#link">Team Info.</Nav.Link>
                        <NavDropdown title="Old Ideas" id="basic-nav-dropdown">
                            <NavDropdown.Item id="list" href="#action/3.1">
                                2020
                            </NavDropdown.Item>
                            <NavDropdown.Item id="list" href="#action/3.2">
                                2019
                            </NavDropdown.Item>
                            <NavDropdown.Item id="list" href="#action/3.3">
                                2018
                            </NavDropdown.Item>

                            <NavDropdown.Divider />

                            <NavDropdown.Item id="list" href="#action/3.4">
                                2017
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                        />
                        <Button variant="dark">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default SearchBar;

/*
import React, { useState } from "react";
import "./SearchBar.css";
import ErrorHandlingInput from "../../utils/ErrorHandlingInput";
import { Button } from "utils";

function SearchBar() {
    const [search, setSearch] = useState("Search...");
    return (
        <>
            <div className="searchBar">
                <ErrorHandlingInput
                    id="search"
                    value={search}
                    onClick={() => {
                        if (search === "Search...") setSearch("");
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button label="search" />
            </div>
        </>
    );
}

export default SearchBar;
*/
