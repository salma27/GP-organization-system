import { Button, Form, Col, Row } from "react-bootstrap";
import React, { useState, useCallback, useEffect } from "react";
import { BsButton } from "utils";
import { useHistory, Link, BrowserRouter } from "react-router-dom";
import * as r from "routes/routes";
import {useRequest} from "hooks";
import {staffEditProfile} from "requests";
import { toast } from "react-toastify";

function MaxProjects({teamsSlots=0}) {
    const [max, setMax] = useState(teamsSlots);
    const history = useHistory();
    const [request,requesting] = useRequest(staffEditProfile);

    const seeProjects = () => {
        let path = r.staffSupervisedProjectsRoute;

        history.push(path);
    };

    const updateProfile=(num)=>{
        const temp = [];
        console.log(num);
        request({ teamsSlots: num })
            .then(res=>{
                toast.success("Update max number of teams successfully")
                // window.location.reload();
            })
            .catch(e=>{
                toast.error("Couldn't Add");
            })
    }
    
    const inc = (e) => {
        e.preventDefault();
        if (max < 10) {
            setMax(max + 1);
            updateProfile(max+1);
        }
        else setMax(10);
        
    }
    const dec = (e) => {
        e.preventDefault();
        if (max > 0){ 
            updateProfile(max-1);
            setMax(max - 1);
        }
        else setMax(0);
    }

    return (
        <>
            <Form
                className="w-100"
                style={{ paddingBottom: "40px", paddingTop: "20px" }}
            >
                <Row>
                    <Col>
                        <Form.Label>Maximum Projects: </Form.Label>
                    </Col>
                </Row>
                <div id="notesBtn" style={{ width: "40%" }}>
                    <Row>
                        <Col>
                            <BsButton
                                size="sm"
                                label="<"
                                onClick={dec}
                            />
                        </Col>
                        <Col>
                            <label centered>{max}</label>
                        </Col>
                        <Col>
                            <BsButton size="sm" label=">" onClick={inc} />
                        </Col>
                    </Row>
                </div>
                <Row style={{ marginTop: "7px" }}>
                    <BsButton
                        size="sm"
                        label="See My Projects"
                        id="notesBtn"
                        width="300px"
                        onClick={seeProjects}
                    />
                </Row>
            </Form>
        </>
    );
}

export default MaxProjects;
