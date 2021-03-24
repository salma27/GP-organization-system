import React, {useState} from "react";
import "./SearchBar.css";
import {BsButton, LoginImg} from "utils";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

import "bootstrap/dist/css/bootstrap.min.css";

function SearchBar() {
    const [search, setSearch] = useState("Search...");
    const onChangeHandler = ({target: {name, value}}) => {
        setSearch(value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <>
            {/* <script
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
                <Navbar.Collapse id="basic-navbar-nav"> */}
            <Form inline onSubmit={onSubmit}>
                <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    value={search}
                    onChange={onChangeHandler}
                />
                <BsButton label="Search" block="" size="md" />
            </Form>
            {/* <Nav className="mr-auto">
                        <Nav.Link href="#home">News Feed</Nav.Link>
                        <Nav.Link href="#link">Old Ideas</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar> */}
        </>
    );
}

export default SearchBar;
