import React from "react";
import { Navbar } from "components/navbar";
import * as pages from "./";
import { Tab, Tabs, Nav } from "react-bootstrap";
import { useAuthContext } from "hooks";

const style = {
    // backgrounds from 1 to 5 i.e. feed_4
    backgroundImage: "url(/feed_7.svg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover"
    // height:"100vh",
};

const Info = () => {
    const { isStaff } = useAuthContext();
    return (
        <div className="container-fluid" style={style}>
            <div className="row">
                <div className="col-12">
                    <Navbar />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-7 m-auto">
                    <Tabs
                        defaultActiveKey="profile"
                        variant="pills"
                        className="nav-justified"
                    >
                        <Tab eventKey="profile" title="Profile">
                            <pages.UserInfo />
                        </Tab>
                        <Tab eventKey="team" title="Team">
                            <pages.ShowingTeam />
                        </Tab>
                        {isStaff && (
                            <Tab eventKey="projects" title="Projects">
                                <pages.Projects />
                            </Tab>
                        )}
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Info;
