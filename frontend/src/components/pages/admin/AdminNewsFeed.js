import { AdminNavbar } from "components/navbar";
import { AddNewsFeed } from "components/Modals";
import React, { useState, useEffect } from "react";
import {NewsFeedCard, Loading} from "components/cards";
import { useRequest } from "hooks";
import { adminGetFeeds } from "requests";
import { toast } from "react-toastify";

const feeds = [
    {
        title: "News Feed Title",
        time: new Date(),
        description: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Duis interdum porta velit id accumsan. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos
        himenaeos. Sed non condimentum tellus, sit amet rutrum
        mauris. Donec sodales venenatis scelerisque. Quisque eu
        suscipit ligula. Cras tristique mi quis quam cursus
        bibendum. Quisque semper mauris ac nisi elementum lacinia.`,
    },
    {
        title: "News Feed Title",
        time: new Date(),
        description: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Duis interdum porta velit id accumsan. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos
        himenaeos. Sed non condimentum tellus, sit amet rutrum
        mauris. Donec sodales venenatis scelerisque. Quisque eu
        suscipit ligula. Cras tristique mi quis quam cursus
        bibendum. Quisque semper mauris ac nisi elementum lacinia.`,
    },
    {
        title: "News Feed Title",
        time: new Date(),
        description: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Duis interdum porta velit id accumsan. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos
        himenaeos. Sed non condimentum tellus, sit amet rutrum
        mauris. Donec sodales venenatis scelerisque. Quisque eu
        suscipit ligula. Cras tristique mi quis quam cursus
        bibendum. Quisque semper mauris ac nisi elementum lacinia.`,
    },
    {
        title: "News Feed Title",
        time: new Date(),
        description: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Duis interdum porta velit id accumsan. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos
        himenaeos. Sed non condimentum tellus, sit amet rutrum
        mauris. Donec sodales venenatis scelerisque. Quisque eu
        suscipit ligula. Cras tristique mi quis quam cursus
        bibendum. Quisque semper mauris ac nisi elementum lacinia.`,
    },
    {
        title: "News Feed Title",
        time: new Date(),
        description: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Duis interdum porta velit id accumsan. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos
        himenaeos. Sed non condimentum tellus, sit amet rutrum
        mauris. Donec sodales venenatis scelerisque. Quisque eu
        suscipit ligula. Cras tristique mi quis quam cursus
        bibendum. Quisque semper mauris ac nisi elementum lacinia.`,
    },
    {
        title: "News Feed Title",
        time: new Date(),
        description: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Duis interdum porta velit id accumsan. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos
        himenaeos. Sed non condimentum tellus, sit amet rutrum
        mauris. Donec sodales venenatis scelerisque. Quisque eu
        suscipit ligula. Cras tristique mi quis quam cursus
        bibendum. Quisque semper mauris ac nisi elementum lacinia.`,
    },
];

const AdminNewsFeed = () => {
    const [showModal, setShowModal] = useState(false);
    const [request,requesting] = useRequest(adminGetFeeds);
    const [data,setData] = useState([]);

    useEffect(() => {
        request()
        .then(response => setData(response.data))
        .catch(error => toast.error("couldn't get news feed"))
    }, [])

    return ( 
        <div className="container-fluid">
            <AdminNavbar />
            {requesting ?
                <div className="container" style={{height:"80vh"}}> 
                    <div className="d-flex" style={{justifyContent:"center"}}>
                        <Loading /> 
                    </div>
                </div>
                :
                <div className="p-1 border rounded container">
                    <button
                        onClick={() => setShowModal(true)}
                        className="btn btn-lg btn-secondary py-1 px-2 mr-1 mt-2 w-100"
                        style={{
                        //     backgroundColor: "#00BFA6",
                        //     borderColor: "#00BFA6",
                            marginBottom: "10px",
                        }}
                    >
                        Add News Feed
                    </button>
                    <AddNewsFeed
                        show={showModal}
                        hide={() => setShowModal(false)}
                        title=""
                        brief_description=""
                        tech={[]}
                        btn="Add Project"
                    />
                    <div className="row">
                        <div className="col-12">
                            {data.map((f, i) => (
                                <NewsFeedCard {...f} key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
 
export default AdminNewsFeed;