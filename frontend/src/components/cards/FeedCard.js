import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";

const FeedCard = () => {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    <b>title</b>
                </Card.Title>
                <Card.Text>other body</Card.Text>
                <hr />
                <Card.Text className="d-flex">body</Card.Text>
            </Card.Body>
        </Card>
    );
};
export default FeedCard;
