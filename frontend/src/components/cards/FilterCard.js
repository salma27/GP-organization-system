import React from "react";
import {Card} from "react-bootstrap";

const FilterCard = ({}) => {
    const cardStyle = {
        backgroundColor: "#00bfa6",
        color: "white",
    };
    return (
        <Card className="mb-3" style={cardStyle}>
            <Card.Body>
                <Card.Title>Filters</Card.Title>
                <Card.Text></Card.Text>
                <hr />
                <Card.Text className="d-flex"></Card.Text>
            </Card.Body>
        </Card>
    );
};
export default FilterCard;
