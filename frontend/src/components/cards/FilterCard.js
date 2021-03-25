import React from "react";
import {Card} from "react-bootstrap";
import {Select} from "utils";

let options = [
    {label: "Machine learning", value: "ML"},
    {label: "Artifial intelligence", value: "AI"},
    {label: "Mobile app development", value: "MD"},
    {label: "Web development", value: "WD"},
];
const FilterCard = ({}) => {
    const cardStyle = {
        backgroundColor: "#00bfa6",
        color: "white",
        borderStyle: "solid",
        borderColor: "white",
    };
    return (
        <Card className="mb-3" style={cardStyle}>
            <Card.Body>
                <Card.Title>Filters</Card.Title>
                <Card.Text></Card.Text>
                <hr />
                <div className="text-primary">
                    <Select name="value" options={options} />
                </div>
                <Card.Text className="d-flex"></Card.Text>
            </Card.Body>
        </Card>
    );
};
export default FilterCard;
