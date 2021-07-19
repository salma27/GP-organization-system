import {FilterStudents, StudentCard} from "components/cards";
import {Navbar} from "components/navbar";
import { useRequest } from "hooks";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import getAllStudents from "requests/getAllStudents";
import "styles/stickey.css";

const res = [
    {
        id:1,
        name: "Sarah Saeed Ibrahim Rofail",
        department : "cs",
        tech: ["ML", "Web development", "Mobile app development"],
        projects:["pro1", "pro2", "pro3", "pro4", "pro5", "pro6", "pro7", "pro8"],
        num : 3
    },
    {
        id:2,
        name: "Sarah Saeed Ibrahim Rofail",
        department : "cs",
        tech: ["ML", "Web development", "Mobile app development"],
        projects:["pro1", "pro2", "pro3", "pro4"],
        num : 2
    },
    {
        id:3,
        name: "Sarah Saeed Ibrahim Rofail",
        department : "cs",
        tech: ["ML", "Web development"],
        projects:["pro1", "pro2", "pro5"],
        num : 0
    },
    {
        id:4,
        name: "Sarah Saeed Ibrahim Rofail",
        department : "Is",
        tech: ["Mobile app development"],
        projects:["pro3", "pro4", "pro5"],
        num : 5
    },
    {
        id:5,
        name: "Sarah Saeed Ibrahim Rofail",
        department : "CS",
        num : 1
    },
    {
        id:6,
        name: "Sarah Saeed Ibrahim Rofail",
        tech: ["ML", "Web development"],
        department : "CS",
        num : 5
    },
    {
        id:7,
        name: "Sarah Saeed Ibrahim Rofail",
        tech: ["ML", "Web development", "Mobile app development"],
        department : "DS",
        num : 0
    },
    {
        id:8,
        name: "Sarah Saeed Ibrahim Rofail",
        department : "CS",
        projects:["pro1", "pro4", "pro5"],
        num : 3
    },
];
const style = {
    // backgrounds from 1 to 5 i.e. feed_4
    backgroundImage: "url(/feed_7.svg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
};

const StudentsSearchResult = (props) => {
    const [allStudents, setAllStudents] = useState([]);
    const [request, requesting] = useRequest(getAllStudents);
    useEffect(() => {
        request({})
            .then((r) => {
                setAllStudents(r.data); ///r.data.students
            })
            .catch((e) => {
                toast.error("Error viewing search results");
            });
    }, []);



    const search = {search:props.match.params.id,type:props.match.params.type};
    return (
        <div className="container-fluid" style={style}>
            <div className="row">
                <div className="col-12">
                    <Navbar />
                </div>
                <div className="col-10 offset-1">
                    <div className="row">
                        <div className="col-12 d-inline d-lg-none">
                            <FilterStudents />
                        </div>
                        <div className="col-12 col-lg-8">
                            {search.type==="students"?
                            allStudents.map((p, i) => (
                                <StudentCard {...p} isStudent={search.type==="students"} key={i} id={p.ecomId}/>
                            ))
                            :res.map((p, i) => (
                                <StudentCard {...p} isStudent={search.type==="students"} key={i} id={p.id}/>
                            ))}
                        </div>
                        <div className="d-none d-lg-inline col-lg-4">
                            <div className="sidebar-item">
                                <div className="make-me-sticky">
                                    <FilterStudents />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default StudentsSearchResult;
