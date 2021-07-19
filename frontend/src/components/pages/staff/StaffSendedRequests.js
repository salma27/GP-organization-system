import {RequestCard} from "components/cards";
import React from "react";
import {CardColumns} from "react-bootstrap";

const requests = [
    {
        name: "Alen douglas",
        join: true,
    },
    {
        name: "Mike mikey",
        join: true,
    },
    {
        name: "Ali kory",
        join: false,
    },
    {
        name: "My name",
        join: false,
    },
    {
        name: "Tarzan",
        join: true,
    },
    {
        name: "Elsa",
        join: false,
    },
];
const StaffSendedRequests = () => {
    return (
        <div>
            <div className="row">
                <CardColumns>
                    {requests.map((r, i) => (
                        <RequestCard {...r} key={i} ShowAcceptBtn={false}/>
                    ))}
                </CardColumns>
            </div>
        </div>
    );
};
export default StaffSendedRequests;
