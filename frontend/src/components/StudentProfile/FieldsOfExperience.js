import React, { useState } from "react";
//import Button from "../../utils/Button";
import "./FieldsOfExperience.css";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import { BsButton } from "utils";

function FieldsOfExperience(props) {
    const [value, setValue] = useState([]);
    const [oneTech, setOne] = useState();
    const selected = () => {
        if (oneTech && !value.includes(oneTech) && oneTech !== "-1")
            setValue([...value, oneTech]);
    };
    const setOneItem = (e) => setOne(e.target.value);
    const removeItem = (index) => {
        const temp = [];
        value.forEach((v, i) => {
            if (index !== i) {
                temp.push(v);
            }
        });
        setValue(temp);
    };
    return (
        <>
            <Form>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Fields Of Experience:</Form.Label>
                    <Form.Control
                        as="select"
                        style={{ backgroundColor: "#e9ecef", opacity: 1 }}
                        onChange={setOneItem}
                        //id="experienceList"
                    >
                        <option value="-1" id="list"></option>

                        {props.tech.map((addField) => (
                            <option id="list" value={addField} key={addField}>
                                {addField}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <BsButton size="sm" id="addBtn" onClick={selected} label="+" />
            </Form>
            <hr
                style={{
                    color: "teal",
                    backgroundColor: "teal",
                    height: "1px",
                }}
            />

            <Container id="field">
                {value.map((v, i) => (
                    <Row key={i} style={{ marginTop: "10px" }} width="100%">
                        <Col
                            style={{ marginLeft: "5px", float: "left" }}
                            className="choosen"
                        >
                            {v}
                        </Col>
                        <Col>
                            <Button
                                style={{ float: "right", marginRight: "5px" }}
                                size="sm"
                                type="submit"
                                onClick={() => removeItem(i)}
                                variant="secondary"
                            >
                                X
                            </Button>
                        </Col>
                    </Row>
                ))}
            </Container>
        </>
    );
}
export default FieldsOfExperience;

/*
import React, { useState } from "react";
//import Button from "../../utils/Button";
import "./FieldsOfExperience.css";
import { Button } from "react-bootstrap";
//import {BootstrapButton}

function FieldsOfExperience(props) {
    const [value, setValue] = useState([]);
    const [oneTech, setOne] = useState();
    const selected = () => {
        if (oneTech && !value.includes(oneTech) && oneTech !== "-1")
            setValue([...value, oneTech]);
    };
    const setOneItem = (e) => setOne(e.target.value);
    const removeItem = (index) => {
        const temp = [];
        value.forEach((v, i) => {
            if (index !== i) {
                temp.push(v);
            }
        });
        setValue(temp);
    };
    return (
        <div>
            <div>
                <label>Fields Of Experience:</label>
                <select onChange={setOneItem} id="experienceList">
                    <option value="-1"></option>
                    {props.tech.map((addField) => (
                        <option value={addField} key={addField}>
                            {addField}
                        </option>
                    ))}
                </select>
                <Button onClick={selected} label="+" />
            </div>
            <div id="field">
                <table id="addedFields">
                    {value.map((v, i) => (
                        <tr key={i}>
                            <td className="choosen">- {v}</td>
                            <td>
                                <Button
                                    block
                                    size="lg"
                                    type="submit"
                                    //disabled={!validateForm()}
                                    //id="loginBtn"

                                    //variant="dark"
                                    //bd="sm"
                                    onClick={() => removeItem(i)}
                                    //label="X"
                                    //className="delete"
                                    width="55px"
                                    height="25px"
                                >
                                    X
                                </Button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
}
export default FieldsOfExperience;
*/
