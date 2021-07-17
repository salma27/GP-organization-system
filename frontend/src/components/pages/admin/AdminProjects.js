import { AdminNavbar } from "components/navbar";
import React, { useState } from "react";
import { CurrentProjectDataTable } from "components/datatables";

const projects = [
    {
        title: "Tbdel",
        brief_description:
            "an online platform that people can exchange their old items together on",
        tech: ["ML", "Web development", "Mobile app development"],
        name: "Salma",
    },
    {
        title: "GP organizer",
        brief_description:
            "A faculty platformfor student to register their ideas and form teams on",
        tech: ["ML", "Web development", "Mobile app development"],
        name: "Sara",
    },
    {
        title: "Gold digger",
        brief_description: "a gold stock pridector using ML",
        tech: ["ML", "Web development"],
        name: "Ali",
    },
    {
        title: "Tbdel",
        brief_description:
            "an online platform that people can exchange their old items together on",
        tech: ["Mobile app development"],
        name: "Shrouk",
    },
    {
        title: "Gold digger",
        brief_description:
            "Nullam fermentum quam interdum tortor fermentum auctor. Morbi in venenatis lectus. In dignissim iaculis nisi ultricies dictum. Aliquam erat volutpat",
        name: "Sameh",
    },
    {
        title: "GP organizer",
        brief_description:
            "A faculty platformfor student to register their ideas and form teams on",
        tech: ["ML", "Web development"],
        name: "Nour",
    },
    {
        title: "GP organizer",
        brief_description:
            "A faculty platformfor student to register their ideas and form teams on",
        tech: ["ML", "Web development", "Mobile app development"],
        name: "Maged",
    },
    {
        title: "GP organizer",
        brief_description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac nisl rhoncus, dapibus felis vel, aliquet mi. Praesent non turpis nec sapien faucibus ornare eu efficitur eros. In finibus ultrices porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi vitae mattis nisl.",
        name: "Magy",
    },
];
const AdminProjects = () => {
    const [showModal, setShowModal] = useState(false);

    return ( 
        <>
            <div className="container-fluid">
                <AdminNavbar />
                <div className="p-1 border rounded">
                    <CurrentProjectDataTable />
                </div>
            </div>
        </>
    );
}
 
export default AdminProjects;