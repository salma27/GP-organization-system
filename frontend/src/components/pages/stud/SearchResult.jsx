import { FilterStudents, StudentCard } from "components/cards";
import { Navbar } from "components/navbar";
import { useRequest } from "hooks";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllDoctors, getAllTAs } from "requests";
import getAllStudents from "requests/getAllStudents";
import "styles/stickey.css";
import { Paginate } from "utils";

const style = {
    // backgrounds from 1 to 5 i.e. feed_4
    backgroundImage: "url(/feed_7.svg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    height: "100%",
};

const StudentsSearchResult = (props) => {
    const search = {
        search: props.match.params.id,
        type: props.match.params.type,
    };

    const [results, setResults] = useState([]);
    const [request, requesting] = useRequest(
        search.type === "students"
            ? getAllStudents
            : search.type === "doctors"
            ? getAllDoctors
            : getAllTAs
    );

    useEffect(() => {
        if (search.search === "all") {
            request({})
                .then((r) => {
                    setResults(
                        search.type === "students"
                            ? r.data.students
                            : r.data.supervisors
                    );
                    toast.success("Data loaded successfully");
                })
                .catch((e) => {
                    toast.error("Error viewing search results");
                });
        }
    }, []);

    return (
        <div className="container-fluid" style={style}>
            <div className="row">
                <div className="col-12">
                    <Navbar />
                </div>
                <div className="col-10 offset-1">
                    <div className="row">
                        <div className="col-12 d-inline d-lg-none">
                            <FilterStudents
                                setResults={setResults}
                                request={request}
                                requesting={requesting}
                                name={search.type}
                            />
                        </div>
                        <div className="col-12 col-lg-8">
                            <Paginate>
                                {results.map((p, i) => (
                                    <StudentCard
                                        result={p}
                                        isStudent={search.type === "students"}
                                        id={p.ecomId}
                                        key={i}
                                    />
                                ))}
                            </Paginate>
                        </div>
                        <div className="d-none d-lg-inline col-lg-4">
                            <div className="sidebar-item">
                                <div className="make-me-sticky">
                                    <FilterStudents
                                        setResults={setResults}
                                        request={request}
                                        requesting={requesting}
                                        name={search.type}
                                    />
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
