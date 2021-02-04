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
                <Button>Button</Button>
                <Button>Button</Button>

                <DropdownButton
                    as={ButtonGroup}
                    title="Dropdown"
                    id="bg-vertical-dropdown-1"
                >
                    <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
                </DropdownButton>

                <Button>Button</Button>
                <Button>Button</Button>

                <DropdownButton
                    as={ButtonGroup}
                    title="Dropdown"
                    id="bg-vertical-dropdown-2"
                >
                    <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
                </DropdownButton>

                <DropdownButton
                    as={ButtonGroup}
                    title="Dropdown"
                    id="bg-vertical-dropdown-3"
                >
                    <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
                </DropdownButton>
            </ButtonGroup>
        </>
    );
}

export default SideBar;
