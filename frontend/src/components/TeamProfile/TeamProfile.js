import React from "react";
import { SideBar, TeamProfileImg } from "utils";
import "./TeamProfile.css";
import SearchBar from "../SearchBar/SearchBar";
import TeamMembers from "../TeamProfile/TeamMembers";
import { Form, Col } from "react-bootstrap";

function TeamProfile() {
    return (
        <>
            <SearchBar />
            <SideBar />
            <TeamProfileImg />

            <div id="teamInfo">
                <Form>
                    <Form.Row>
                        <Col md={4} lg={4} sm={2}>
                            <Form.Label>Team ID: </Form.Label>
                        </Col>
                        <Col md={6} lg={6} sm={8}>
                            <Form.Control disabled />
                        </Col>
                    </Form.Row>
                </Form>
                <TeamMembers />
            </div>
        </>
    );
}

export default TeamProfile;
