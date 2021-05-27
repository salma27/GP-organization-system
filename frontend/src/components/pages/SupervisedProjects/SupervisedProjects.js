import { Button, Form, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import { BsButton } from "utils";
import { SupervisedProjectCard } from "components/cards";
import { CardColumns } from "react-bootstrap";
import { Navbar } from "components/navbar";
import "styles/dashboard.css";
import { ProfileSidebar } from "components/sidebar";
import "styles/stickey.css";

function SupervisedProjects() {
    const projects = [
        {
            title: "Tbdel",
            brief_description:
                "an online platform that people can exchange their old items together on",
            tech: ["ML", "Web development", "Mobile app development"],
            students: ["Martin", "Diana", "Java"],
            TA: ["Belly"],
            Dr: ["Mom"],
        },
        {
            title: "GP organizer",
            brief_description:
                "A faculty platformfor student to register their ideas and form teams on",
            tech: ["ML", "Web development", "Mobile app development"],
            students: ["Alex", "Clover", "Sam"],
            TA: ["Jerry"],
            Dr: ["Mandy"],
        },
        {
            title: "Gold digger",
            brief_description: "a gold stock pridector using ML",
            tech: ["ML", "Web development"],
            students: ["Elsa", "Anna", "Gastov"],
            TA: ["Davinchi"],
        },
        {
            title: "Tbdel",
            brief_description:
                "an online platform that people can exchange their old items together on",
            tech: ["Mobile app development"],
            students: ["Air", "Earth", "Fire"],
            TA: ["Water"],
        },
        {
            title: "Gold digger",
            brief_description:
                "Nullam fermentum quam interdum tortor fermentum auctor. Morbi in venenatis lectus. In dignissim iaculis nisi ultricies dictum. Aliquam erat volutpat",
            students: ["Simba", "Kyara", "Kokvo"],
            Dr: ["Mofasa"],
        },
    ];

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <Navbar />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-xs-12 col-md-2 col-lg-2">
                        <div className="sidebar-item">
                            <div className="make-me-sticky">
                                <ProfileSidebar />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-xs-12 col-md-10 col-lg-10">
                        <CardColumns>
                            {projects.map((p, i) => (
                                <SupervisedProjectCard {...p} key={i} />
                            ))}
                        </CardColumns>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SupervisedProjects;
