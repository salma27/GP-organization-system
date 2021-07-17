import { ProjectCard } from "components/cards";
import { CardColumns } from "react-bootstrap";
import { EditProject } from "components/Modals";
import React, { useState } from "react";

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
    {
        title: "GP organizer",
        brief_description:
            "A faculty platformfor student to register their ideas and form teams on",
        tech: ["ML", "Web development"],
    },
    {
        title: "GP organizer",
        brief_description:
            "A faculty platformfor student to register their ideas and form teams on",
        tech: ["ML", "Web development", "Mobile app development"],
    },
    {
        title: "GP organizer",
        brief_description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac nisl rhoncus, dapibus felis vel, aliquet mi. Praesent non turpis nec sapien faucibus ornare eu efficitur eros. In finibus ultrices porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi vitae mattis nisl.",
    },
];

const StudentProjectsPage = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div>
            <button
                onClick={() => setShowModal(true)}
                className="btn btn-lg btn-primary py-1 px-2 mr-1 mt-2 w-100"
                style={{
                    backgroundColor: "#00BFA6",
                    borderColor: "#00BFA6",
                    marginBottom: "10px",
                }}
            >
                Add New Project
            </button>
            <EditProject
                show={showModal}
                hide={() => setShowModal(false)}
                title=""
                brief_description=""
                tech={[]}
                btn="Add Project"
            />

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
