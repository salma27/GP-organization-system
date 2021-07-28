import React, { useEffect, useState } from "react";
import "./FieldsOfExperience.css";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import { BsButton } from "utils";
import { useRequest, useTechnology } from "hooks";
import { toast } from "react-toastify";
import editStudentProfile from "requests/editStudentProfile";

function FieldsOfExperience(props) {
    const [myTech, setMyTech] = useState(props.profile.technologies);

    const [oneTech, setOne] = useState();
    const [request, requesting] = useRequest(editStudentProfile);

    useEffect(() => {
        setMyTech(props.profile.technologies);
    }, [props.profile.technologies]);

    function editProfile(newValue) {
        const techID = [];
        newValue.forEach((t) => {
            techID.push(t.id);
        });
        console.log(techID);
        request({ technologyIds: techID })
            .then((r) => {
                toast.success("Updated successully");
            })
            .catch((e) => {
                toast.error("Error updating profile");
            });
    }
    const selected = (e) => {
        e.preventDefault();
        const techID = [];
        myTech.forEach((t) => {
            techID.push(t.id);
        });
        if (oneTech && !techID.includes(oneTech.id) && oneTech.id !== "-1") {
            setMyTech([...myTech, oneTech]);
            editProfile([...myTech, oneTech]);
        }
    };
    const setOneItem = (e) => {
        setOne(allTech[e.target.value]);
    };
    const removeItem = (id) => {
        const temp = [];
        myTech.forEach((v) => {
            if (id !== v.id) {
                temp.push(v);
            }
        });
        setMyTech(temp);
        editProfile(temp);
    };
    const [allTech] = useTechnology();
    return (
        <>
            <Form
                onSubmit={(e) => {
                    //e.preventDefault();
                }}
                className="w-100"
            >
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Fields Of Experience:</Form.Label>
                    <Form.Control
                        as="select"
                        style={{ backgroundColor: "#e9ecef", opacity: 1 }}
                        onChange={setOneItem}
                        //id="experienceList"
                    >
                        <option value="-1" id="list"></option>

                        {allTech.length &&
                            allTech.map((addField, i) => (
                                <option id="list" value={i} key={addField.id}>
                                    {addField.name}
                                </option>
                            ))}
                    </Form.Control>
                </Form.Group>
                <BsButton size="sm" id="addBtn" onClick={selected} label="+" />
            </Form>
            {myTech && myTech.length && (
                <>
                    <hr
                        style={{
                            color: "teal",
                            backgroundColor: "teal",
                            height: "1px",
                        }}
                    />
                    <Container id="field">
                        {myTech.map((v) => (
                            <Row
                                key={v.id}
                                style={{ marginTop: "10px" }}
                                width="100%"
                            >
                                <Col
                                    style={{
                                        marginLeft: "5px",
                                        float: "left",
                                    }}
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
                                        onClick={() => removeItem(v.id)}
                                        variant="secondary"
                                    >
                                        X
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                    </Container>
                </>
            )}
        </>
    );
}
export default FieldsOfExperience;
