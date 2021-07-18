import React, {useState, useEffect} from "react";
import "./../StudentProfile/FieldsOfExperience.css";
import {Button, Form, Col, Row, Container} from "react-bootstrap";
import {BsButton} from "utils";

function Projects({tech=[],setTech,technologyIds=[]}) {
    const [value, setValue] = useState(technologyIds);
    const [oneTech, setOne] = useState();
    const selected = (e) => {
        e.preventDefault();
        if (oneTech && !value.includes(oneTech) && oneTech !== "-1")
        {
            setValue([...value, oneTech]);
            // props.setTech(value);
        }
    };
    useEffect(() => {
        setTech(value);
    }, [value])
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
            <Form onSubmit={(e) => e.preventDefault()} className="w-100">
                <div className="row w-100">
                    <div className="col-10 p-0">
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Control
                                as="select"
                                style={{backgroundColor: "#e9ecef", opacity: 1}}
                                onChange={setOneItem}
                                //id="experienceList"
                            >
                                <option value="-1" id="list"></option>

                                {tech.map((addField) => (
                                    <option id="list" value={addField} key={addField}>
                                        {addField}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-2 p-0">
                        <BsButton size="sm" id="addBtn" onClick={selected} label="+" className="w-100" style={{maxHeight:" 38px"}}/>
                    </div>
                </div>
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
                                style={{marginTop: "10px"}}
                                width="100%"
                            >
                                <Col
                                    style={{marginLeft: "5px", float: "left"}}
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
export default Projects;
