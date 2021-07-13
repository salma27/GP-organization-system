import React from 'react';
import {Badge, Card} from "react-bootstrap";
import "./../../css/personInfoCard.css";

const Technologies = (props) => {
    return ( 
        
        <Card.Text>
            {props.tech.map((t, i) => (
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
            {!props.tech.length && "No technologies provided"}
        </Card.Text>
    );
}
 
export default Technologies;