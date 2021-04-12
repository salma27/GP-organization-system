import {FilterStudents, StudentCard} from "components/cards";
import {Navbar} from "components/navbar";
import React from "react";
import "styles/stickey.css";

const res = [
    {
        name: "Sarah Saeed Ibrahim Rofail",
        department : "cs",
        tech: ["ML", "Web development", "Mobile app development"],
    },
    {
        name: "Sarah Saeed Ibrahim Rofail",
        department : "cs",
        tech: ["ML", "Web development", "Mobile app development"],
    },
    {
        name: "Sarah Saeed Ibrahim Rofail",
        department : "cs",
        tech: ["ML", "Web development"],
    },
    {
        name: "Sarah Saeed Ibrahim Rofail",
        department : "Is",
        tech: ["Mobile app development"],
    },
    {
        name: "Sarah Saeed Ibrahim Rofail",
        department : "CS",
    },
    {
        name: "Sarah Saeed Ibrahim Rofail",
        tech: ["ML", "Web development"],
        department : "CS",
    },
    {
        name: "Sarah Saeed Ibrahim Rofail",
        tech: ["ML", "Web development", "Mobile app development"],
        department : "DS",
    },
    {
        name: "Sarah Saeed Ibrahim Rofail",
        department : "CS",
    },
];
const style = {
    // backgrounds from 1 to 5 i.e. feed_4
    backgroundImage: "url(/feed_7.svg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
};

const StudentsSearchResult = () => {
    return (
        <div className="container-fluid" style={style}>
            <div className="row">
                <div className="col-12">
                    <Navbar />
                </div>
                <div className="col-10 offset-lg-1">
                    <div className="row">
                        <div className="col-12 d-inline d-lg-none">
                            <FilterStudents />
                        </div>
                        <div className="col-12 col-lg-8">
                            {res.map((p, i) => (
                                <StudentCard {...p} isStudent={true} key={i} />
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
