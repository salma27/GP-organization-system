import React from "react";
import { Card } from "react-bootstrap";
import moment from "moment";

const FeedCard = (props) => {
    const title = props.feed.title;
    const time = props.feed.date;
    const description = props.feed.content;
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    <b>{title}</b>
                </Card.Title>
                <Card.Text>
                    <span className="text-small">
                        {moment(time).format("DD/MM/YYYY  hh:mm a")}
                    </span>
                </Card.Text>
                <hr />
                <Card.Text className="d-flex">{description}</Card.Text>
            </Card.Body>
        </Card>
    );
};
export default FeedCard;
