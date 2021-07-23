import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Card, Form, Row, Col } from "react-bootstrap";
import { BsButton } from "utils";

const AdminRulesCard = (props) => {
    const departments = ["CS", "IS", "IT", "DS"];
    const [departmentInfo, setDepartmentInfo] = useState({});
    const selectDepartment = ({ target: { name, value } }) => {
        if (value !== "-1")
            setDepartmentInfo({ ...departmentInfo, [name]: value });
        console.log(departmentInfo);
    };
    return (
        <>
            <Card className="mb-3">
                <Card.Body>
                    <Form>
                        <Form.Label className="col-sm-12 col-xs-12 col-md-12 col-lg-12">
                            Choose a Department:
                        </Form.Label>

                        <Form.Control
                            className="col-sm-12 col-xs-12 col-md-6 col-lg-6"
                            as="select"
                            name="department"
                            onChange={selectDepartment}
                            style={{ float: "left" }}
                        >
                            <option value="-1" id="list"></option>

                            {departments.map((department) => (
                                <option
                                    id="list"
                                    value={department}
                                    key={department}
                                >
                                    {department}
                                </option>
                            ))}
                        </Form.Control>
                        <BsButton
                            size="md"
                            id="showInfo"
                            //onClick={selected}
                            label="Show Department Information"
                            className="col-sm-12 col-xs-12 col-md-6 col-lg-6"
                        />
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};
export default AdminRulesCard;
