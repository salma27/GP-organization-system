import React, { useEffect, useState } from "react";
import { Navbar } from "components/navbar";
import * as pages from "./";
import { Tab, Tabs } from "react-bootstrap";
import { useAuthContext, useRequest } from "hooks";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { getOneSupervisor } from "requests";

const style = {
    // backgrounds from 1 to 5 i.e. feed_4
    backgroundImage: "url(/feed_7.svg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    // height:"100vh",
};

const InfoStaff = (props) => {
    const location = useLocation();
    const state = location.state;
    /*const [request, requesting] = useRequest(getOneSupervisor);
    const [user, setUser] = useState([]);
    
    useEffect(() => {
        request({ id: id })
            .then((r) => {
                setUser(r.data);
            })
            .catch((e) => {
                toast.error("Error showing supervisor information");
            });
    }, []);
*/
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
                            <pages.UserInfo
                                //info={user}
                                state={state}
                                show={true}
                                btn={true}
                            />
                        </Tab>
                        <Tab eventKey="projects" title="Projects">
                            <pages.Projects btn={isStaff ? false : true} />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default InfoStaff;
