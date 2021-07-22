import React, { useState } from "react";
import "./FieldsOfExperience.css";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import { BsButton } from "utils";
import { useRequest, useTechnology } from "hooks";
import { toast } from "react-toastify";
import editStudentProfile from "requests/editStudentProfile";

function FieldsOfExperience(props) {
    const [myTech, setMyTech] = useState(props.profile.technologyIds);

    const [oneTech, setOne] = useState();
    const [request, requesting] = useRequest(editStudentProfile);

    function editProfile(event) {
        event.preventDefault();
        request({ technologyIds: myTech })
            .then((r) => {
                toast.success("Updated successully");
            })
            .catch((e) => {
                toast.error("Error updating profile");
            });
    }
    const selected = (e) => {
        if (oneTech && !myTech.includes(oneTech) && oneTech !== "-1")
            setMyTech([...myTech, oneTech]);
        editProfile();
    };
    const setOneItem = (e) => {
        setOne(e.target.value);
        console.log("mine: ", myTech);
    };
    const removeItem = (one) => {
        const temp = [];
        myTech.forEach((v) => {
            if (one !== v) {
                temp.push(v);
            }
        });
        setMyTech(temp);
        editProfile();
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
                            allTech.map((addField) => (
                                <option
                                    id="list"
                                    value={addField.name}
                                    key={addField.id}
                                >
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
                                key={v}
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
                                        onClick={() => removeItem(v)}
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
