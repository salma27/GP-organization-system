import React, { useState, useEffect } from "react";
//import "./FieldsOfExperience.css";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import { BsButton } from "utils";
import {useRequest, useTechnology} from "hooks";
import {staffEditProfile} from "requests";
import { toast } from "react-toastify";

function FieldsOfExperience(props) {
    const [value, setValue] = useState([]);
    const [techIds, setTechIds] = useState(props.technologyIds);
    const [oneTech, setOne] = useState();
    const [tech] = useTechnology();
    const [request,requesting]=useRequest(staffEditProfile)

    const checkIn= (item)=>{
        return value.find(ele=>ele.id===item.id && ele.name===item.name)
    }

    const updateProfile=()=>{
        const temp = [];
        value.forEach((v) => temp.push(v.id));
        request({ technologyIds: temp })
            .then(res=>{
                toast.success("Added technology successfully")
                // window.location.reload();
            })
            .catch(e=>{
                toast.error("Couldn't Add");
            })
    }

    const selected = (e) => {
        e.preventDefault();
        // console.log();
        if (oneTech && checkIn(tech[oneTech])===undefined && oneTech !== "-1")
        {
            // console.log(tech[oneTech]);
            let temp =value.slice();
            temp.push(tech[oneTech]);
            // console.log(temp)
            setValue(temp);
            // setTechIds([...techIds,tech[oneTech].id]);
            updateProfile();
        }
    };
    // useEffect(() => {
    //     const temp = [];
    //     techIds.map(ele=>{
    //         temp.push(tech.find(tech=>{
    //             return ele.id===tech.id
    //         }))
    //     })
    //     setValue(temp)
    // }, [props.technologyIds])

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
                                    {v.name}
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
