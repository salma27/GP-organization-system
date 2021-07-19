import React, {useState, useEffect} from "react";
import "./../StudentProfile/FieldsOfExperience.css";
import {Button, Form, Col, Row, Container} from "react-bootstrap";
import {BsButton} from "utils";
import {useSpecificTechnology, useTechnology} from "hooks"

function Projects({setTech,technologyIds=[],technologies=[]}) {
    const [value, setValue] = useState(technologies);
    const [techIds, setTechIds] = useState(technologyIds);
    const [oneTech, setOne] = useState();
    const [tech] = useTechnology();

    const checkIn= (item)=>{
        return value.find(ele=>ele.id===item.id && ele.name===item.name)
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
        }
    };
    useEffect(() => {
        // console.log(value);
        const temp = [];
        value.forEach((v) => temp.push(v.id));
        setTech(temp);
        // console.log(value);
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

                                {tech.map((addField,index) => (
                                    <option id="list" value={index} name={addField.name} key={addField.id}>
                                        {addField.name}
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
                                        onClick={(e) => {e.preventDefault(); removeItem(i);}}
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
