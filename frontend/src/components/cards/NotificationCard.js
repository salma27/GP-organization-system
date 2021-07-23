import { SettingsBrightness } from "@material-ui/icons";
import moment from "moment";
import { React, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { studentProfileRoute } from "routes/routes";
import { confirmAction } from "utils";

const NotificationCard = (props) => {
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

    return (
        <Card.Body className="m-0 p-0 w-100">
            <Card.Title className="m-0 p-0">
                <b>{props.noti.title}</b>
                <span className="text-small">
                    {moment(props.noti.date).format("DD/MM/YYYY  hh:mm a")}
                </span>
            </Card.Title>
            <Card.Text>{props.noti.content}</Card.Text>
        </Card.Body>
    );
};
export default NotificationCard;
