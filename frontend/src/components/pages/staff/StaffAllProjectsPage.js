import { FilterCard, OldProjectCard } from "components/cards";
import { Navbar } from "components/navbar";
import React from "react";
import "styles/stickey.css";

const projects = [
    {
        title: "Tbdel",
        brief_description:
            "an online platform that people can exchange their old items together on",
        tech: ["ML", "Web development", "Mobile app development"],
        team:"team1"
    },
    {
        title: "GP organizer",
        brief_description:
            "A faculty platformfor student to register their ideas and form teams on",
        tech: ["ML", "Web development", "Mobile app development"],
        team:"team2"
    },
    {
        title: "Gold digger",
        brief_description: "a gold stock pridector using ML",
        tech: ["ML", "Web development"],
        team:"team3"
    },
    {
        title: "Tbdel",
        brief_description:
            "an online platform that people can exchange their old items together on",
        tech: ["Mobile app development"],
        team:"team4"
    },
    {
        title: "Gold digger",
        brief_description:
            "Nullam fermentum quam interdum tortor fermentum auctor. Morbi in venenatis lectus. In dignissim iaculis nisi ultricies dictum. Aliquam erat volutpat",
        team:"team5"
    },
    {
        title: "GP organizer",
        brief_description:
            "A faculty platformfor student to register their ideas and form teams on",
        tech: ["ML", "Web development"],
        team:"team6"
    },
    {
        title: "GP organizer",
        brief_description:
            "A faculty platformfor student to register their ideas and form teams on",
        tech: ["ML", "Web development", "Mobile app development"],
        team:"team7"
    },
    {
        title: "GP organizer",
        brief_description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac nisl rhoncus, dapibus felis vel, aliquet mi. Praesent non turpis nec sapien faucibus ornare eu efficitur eros. In finibus ultrices porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi vitae mattis nisl.",
        team:"team8"
    },
];
const style = {
    // backgrounds from 1 to 5 i.e. feed_4
    backgroundImage: "url(/feed_7.svg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
height: "100%"
};
const AllProjects = () => {
    return (
        <div className="container-fluid" style={style}>
            <div className="row">
                <div className="col-12">
                    <Navbar />
                </div>
                <div className="col-12 col-lg-10 m-auto">
                    <div className="row">
                        <div className="col-12 d-inline d-lg-none">
                            <FilterCard year={false}/>
                        </div>
                        <div className="col-12 col-lg-8 ">
                            {projects.map((p, i) => (
                                <OldProjectCard {...p} key={i} btn={true} showTeam={true}/>
                            ))}
                        </div>
                        <div className="d-none d-lg-inline col-lg-4">
                            <div className="sidebar-item">
                                <div className="make-me-sticky">
                                    <FilterCard year={false}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AllProjects;
