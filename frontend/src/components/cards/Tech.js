import React, {useState, useEffect} from "react";
import "./../StudentProfile/FieldsOfExperience.css";
import {Button, Form, Col, Row, Container} from "react-bootstrap";
import {BsButton} from "utils";

const Tech = ({props=[]}) => {
    return (  
        <Container id="field">
            {props && props.value.map((v, i) => (
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
    );
}
 
export default Tech;