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
        <Card.Body className="container w-25 m-0 p-0 w-100">
            <div>
                <b className="m-0 p-0">{props.noti.title}</b>
                <br />
                <pre className="text-small">
                    {moment(props.noti.date).format("DD/MM/YYYY  hh:mm a")}
                </pre>
                <pre
                    style={{
                        textAlign: "justify",
                        display: "inline-block",
                        wordWrap: "break-word",
                    }}
                >
                    {props.noti.content}
                </pre>
            </div>
        </Card.Body>
    );
};
export default NotificationCard;
