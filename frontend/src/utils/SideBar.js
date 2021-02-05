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
            <div id="sidebar">
                <Tab.Container width="100%" variant="secondary">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="secondary">
                                <Nav.Item width="100%" id="list">
                                    <Nav.Link eventKey="first">Tab 1</Nav.Link>
                                </Nav.Item>
                                <Nav.Item width="100%" id="list">
                                    <Nav.Link eventKey="second">Tab 2</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    {/*<Sonnet />*/}
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    {/*<Sonnet />*/}
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </>
    );
}

export default SideBar;
