import { SettingsBrightness } from "@material-ui/icons";
import { React, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { studentProfileRoute } from "routes/routes";
import { confirmAction } from "utils";

const NotificationRequestCard = ({ name, join }) => {
    const accept = () => {
        confirmAction({
            message: "Are you sure you want to accept this request?",
            onConfirm: () => {},
        });
    };
    const [hover, setHover] = useState(false);
    const bg = hover
        ? {
              backgroundColor: "white",
              borderColor: "#00BFA6",
              color: "#00BFA6",
          }
        : {
              backgroundColor: "#00BFA6",
              borderColor: "#00BFA6",
              color: "white",
          };
    const decline = () => {
        confirmAction({
            message: "Are you sure you want to decline this request?",
            onConfirm: () => {},
        });
    };

    return (
        <Card.Body className="m-0 p-0 w-100">
            <Card.Title className="m-0 p-0">
                <Link to={studentProfileRoute}>
                    <b>{name}</b>
                </Link>
            </Card.Title>
            <Card.Text>
                {join
                    ? "This student wants you to join their team!"
                    : "This supervisor wants to supervise your team!"}

                <div className="d-flex justify-content-center text-center">
                    <button
                        className="btn btn-primary py-0 px-1 mr-1"
                        style={bg}
                        onPointerOver={() => {
                            setHover(true);
                        }}
                        onPointerOut={() => {
                            setHover(false);
                        }}
                        onClick={accept}
                    >
                        Accept
                    </button>
                    <button
                        className="btn btn-outline-danger py-0 px-1 mr-1"
                        onClick={decline}
                    >
                        Decline
                    </button>
                </div>
            </Card.Text>
        </Card.Body>
    );
};
export default NotificationRequestCard;
