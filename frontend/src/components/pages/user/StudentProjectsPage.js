import {ProjectCard} from "components/cards";
import React from "react";
import {CardColumns} from "react-bootstrap";

const projects = [
    {
        title: "Tbdel",
        brief_description:
            "an online platform that people can exchange their old items together on",
    },
    {
        title: "GP organizer",
        brief_description:
            "A fuckulty platformfor student to register their ideas and form teams on",
    },
    {
        title: "Gold digger",
        brief_description: "a gold stock pridector using ML",
    },
    {
        title: "Tbdel",
        brief_description:
            "an online platform that people can exchange their old items together on",
    },
    {
        title: "Gold digger",
        brief_description:
            "Nullam fermentum quam interdum tortor fermentum auctor. Morbi in venenatis lectus. In dignissim iaculis nisi ultricies dictum. Aliquam erat volutpat",
    },
    {
        title: "GP organizer",
        brief_description:
            "A fuckulty platformfor student to register their ideas and form teams on",
    },
    {
        title: "GP organizer",
        brief_description:
            "A fuckulty platformfor student to register their ideas and form teams on",
    },
    {
        title: "GP organizer",
        brief_description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac nisl rhoncus, dapibus felis vel, aliquet mi. Praesent non turpis nec sapien faucibus ornare eu efficitur eros. In finibus ultrices porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi vitae mattis nisl.",
    },
];

const StudentProjectsPage = () => {
    return (
        <div>
            <div className="row">
                <CardColumns>
                    {projects.map((p, i) => (
                        <ProjectCard {...p} key={i} />
                    ))}
                </CardColumns>
            </div>
        </div>
    );
};
export default StudentProjectsPage;
