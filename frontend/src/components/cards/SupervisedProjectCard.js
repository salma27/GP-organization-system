import React from "react";
import { Badge, Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ImExit } from "react-icons/im";

const SupervisedProjectCard = ({ title, brief_description, tech = [] }) => {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Leave Team
        </Tooltip>
    );
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title className="d-flex">
                    <b>{title}</b>
                    <div className="ml-auto">
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 0, hide: 0 }}
                            overlay={renderTooltip}
                        >
                            <Button className="btn btn-lg btn-danger py-1 px-2 mr-1">
                                <ImExit />
                            </Button>
                        </OverlayTrigger>
                    </div>
                </Card.Title>
                <hr />
                <Card.Text>{brief_description}</Card.Text>
                <hr />
                <Card.Text>
                    {tech.map((t, i) => (
                        <Badge
                            pill
                            style={{
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
                <hr />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <a className="block-example border-bottom border-info text-info font-weight-bold">
                        See More...
                    </a>
                </div>
            </Card.Body>
        </Card>
    );
};
export default SupervisedProjectCard;
