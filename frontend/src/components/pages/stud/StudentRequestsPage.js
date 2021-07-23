import { RequestCard } from "components/cards";
import { useRequest } from "hooks";
import React, { useEffect, useState } from "react";
import { CardColumns } from "react-bootstrap";
import { toast } from "react-toastify";
import { getStudentRequests } from "requests";

const StudentRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [request, requesting] = useRequest(getStudentRequests);
    useEffect(() => {
        request({})
            .then((r) => {
                setRequests(r.data.polls);
            })
            .catch(({ response }) => {
                toast.error(response.data.message);
                toast.error("Error viewing requests");
            });
    }, []);
    return (
        <div>
            <div className="row">
                <CardColumns>
                    {requests &&
                        requests.map((r, i) => (
                            <RequestCard req={r} ShowAcceptBtn={true} key={i} />
                        ))}
                    {!requests && "No available Requests"}
                </CardColumns>
            </div>
        </div>
    );
};
export default StudentRequestsPage;
