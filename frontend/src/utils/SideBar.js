import React from "react";
import "./SideBar.css";
import { Col, Container, Row } from "react-bootstrap";
import {
    Tabs,
    Tab,
    Nav,
    Dropdown,
    DropdownButton,
    ButtonGroup,
    Button,
} from "react-bootstrap";

function SideBar() {
    return (
        <>
            <ButtonGroup vertical id="sidebar">
                <Button variant="secondary">Team Info.</Button>
                <Button variant="secondary">Team Ideas</Button>
                <Button variant="secondary">Add Idea</Button>
            </ButtonGroup>
        </>
    );
}

export default SideBar;
