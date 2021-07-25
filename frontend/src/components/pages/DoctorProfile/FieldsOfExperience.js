import React, { useState, useEffect } from "react";
//import "./FieldsOfExperience.css";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import { BsButton } from "utils";
import {useRequest, useTechnology} from "hooks";
import {staffEditProfile} from "requests";
import { toast } from "react-toastify";

function FieldsOfExperience(props) {
    const [value, setValue] = useState(props.technologies);
    const [techIds, setTechIds] = useState(props.technologies);
    const [oneTech, setOne] = useState();
    const [tech] = useTechnology();
    const [request,requesting]=useRequest(staffEditProfile)

    const checkIn= (item)=>{
        return value.find(ele=>ele.id===item.id && ele.name===item.name)
    }

    const updateProfile=()=>{
        const temp = [];
        // value.forEach((v) => temp.push(v.id));
        console.log(value);
        request({ technologyIds: value })
            .then(res=>{
                toast.success("Update technology successfully")
                // window.location.reload();
            })
            .catch(e=>{
                toast.error("Couldn't Add");
            })
    }

    const selected = (e) => {
        e.preventDefault();
        // console.log();
        
        if (oneTech && !value.includes(tech[oneTech].id) && oneTech !== "-1")
        {
            let temp =value.slice();
            temp.push(tech[oneTech].id);
            setValue(temp);
            // updateProfile();
        }
    };

    useEffect(() => {
        updateProfile();
    }, [value])

    const setOneItem = (e) => {
        setOne(e.target.value);
        console.log(e.target);
    };

    const removeItem = (index) => {
        const temp = [];
        value.forEach((v, i) => {
            if (index !== i) {
                temp.push(v);
            }
        });
        setValue(temp);
        // updateProfile();
    };
    return (
        <>
            <Form onSubmit={(e) => e.preventDefault()} className="w-100">
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Fields Of Experience:</Form.Label>
                    <Form.Control
                        as="select"
                        style={{ backgroundColor: "#e9ecef", opacity: 1 }}
                        onChange={setOneItem}
                        //id="experienceList"
                    >
                        <option value="-1" id="list"></option>

                        {tech.map((addField,index) => (
                            <option id="list" value={index} key={addField}>
                                {addField.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <BsButton size="sm" id="addBtn" onClick={selected} label="+" />
            </Form>
            {value.length ? (
                <>
                    <hr
                        style={{
                            color: "teal",
                            backgroundColor: "teal",
                            height: "1px",
                        }}
                    />
                    <Container id="field">
                        {value.map((v, i) => (
                            <Row
                                key={i}
                                style={{ marginTop: "10px" }}
                                width="100%"
                            >
                                <Col
                                    style={{ marginLeft: "5px", float: "left" }}
                                    className="choosen"
                                >
                                    {v}
                                </Col>
                                <Col>
                                    <Button
                                        style={{
                                            float: "right",
                                            marginRight: "5px",
                                        }}
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
            ) : null}
        </>
    );
}
export default FieldsOfExperience;
