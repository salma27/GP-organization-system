import { Button, Form, Col, Row } from "react-bootstrap";
import React, { useState } from "react";
import { BsButton } from "utils";
import { ProjectCard } from "components/cards";
import { CardColumns } from "react-bootstrap";

function SupervisedProjects() {
    const projects = [
        {
            title: "Tbdel",
            brief_description:
                "an online platform that people can exchange their old items together on",
            tech: ["ML", "Web development", "Mobile app development"],
        },
        {
            title: "GP organizer",
            brief_description:
                "A faculty platformfor student to register their ideas and form teams on",
            tech: ["ML", "Web development", "Mobile app development"],
        },
        {
            title: "Gold digger",
            brief_description: "a gold stock pridector using ML",
            tech: ["ML", "Web development"],
        },
        {
            title: "Tbdel",
            brief_description:
                "an online platform that people can exchange their old items together on",
            tech: ["Mobile app development"],
        },
        {
            title: "Gold digger",
            brief_description:
                "Nullam fermentum quam interdum tortor fermentum auctor. Morbi in venenatis lectus. In dignissim iaculis nisi ultricies dictum. Aliquam erat volutpat",
        },
    ];

    return (
        <>
            <div>
                <div className="row">
                    <CardColumns>
                        {projects.map((p, i) => (
                            <ProjectCard {...p} key={i} />
                        ))}
                    </CardColumns>
                </div>
            </div>
        </>
    );
}

export default SupervisedProjects;
