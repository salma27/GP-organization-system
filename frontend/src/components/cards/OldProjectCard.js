import React from "react";
import {Badge, Card} from "react-bootstrap";

const OldProjectCard = ({title, brief_description, tech = []}) => {
    const style = {
        border: "none",
        borderLeft: "1px solid hsla(200, 10%, 50%,100)",
        minHeight: "100px",
        width: "1px",
    };

    const Hr = () => <hr style={style} />;
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title className="d-flex">
                    <b>{title}</b>
                </Card.Title>
                <hr />
                <div className="row">
                    <div className="col-12 col-lg-8 border-right">
                        <Card.Text>{brief_description}</Card.Text>
                    </div>
                    <div className="col-12 col-lg-4">
                        <Card.Text>
                            {tech.map((t, i) => (
                                <Badge
                                    pill
                                    style={{
                                        // backgroundColor: "white",
                                        color: "#00BFA6",
                                        borderColor: "#00BFA6",
                                        borderWidth: "1px",
                                        borderStyle: "solid",
                                    }}
                                    className="mr-1 mb-1"
                                    key={i}
                                >
                                    {t}
                                </Badge>
                            ))}
                            {!tech.length && "No technologies provided"}
                        </Card.Text>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};
export default OldProjectCard;
