import {RequestCard} from "components/cards";
import React, {useState, useEffect} from "react";
import {CardColumns} from "react-bootstrap";
import {useRequest} from 'hooks';
import {getStudentRequest, studentVote} from "requests";
import { toast } from "react-toastify";

const StudentRequestsPage = () => {
    const [data,setData] = useState([]);
    const [request,requestin] = useRequest(getStudentRequest);
    const [voteRequest,voteRequestin] = useRequest(studentVote);

    useEffect(() => {
        request()
            .then(res=>{
                // console.log(res.data);
                setData(res.data.polls)
            })
            .catch(error=>{
                if(error.response !== undefined) toast.error(error.response.data.message);
                toast.error("Error viewing requests");
            })
    }, [])

    const vote = (pollId,pollOptionId)=>{
        voteRequest({pollId,pollOptionId})
            .then(res=>{
                toast.success("Done");
            })
            .catch(error=>{
                toast.error("faild");
            })
    }


    return (
        <div>
            <div className="row">
                <CardColumns>
                    {data&& data.map((r, i) => (
                        <RequestCard {...r} key={i} vote={vote} />
                    ))}
                    {!data && "No available Requests"}
                </CardColumns>
            </div>
        </div>
    );
};
export default StudentRequestsPage;
