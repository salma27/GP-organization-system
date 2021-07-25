import { FeedCard } from "components/cards";
import { Navbar } from "components/navbar";
import { useRequest } from "hooks";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getNewsFeeds } from "requests";
/*
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
];*/
const style = {
    // backgrounds from 1 to 5 i.e. feed_4
    backgroundImage: "url(/feed_7.svg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
height: "100%"
};
const NewsFeedPage = () => {
    const [request, requesting] = useRequest(getNewsFeeds);
    const [feeds, setFeeds] = useState([]);

    useEffect(() => {
        request({})
            .then((r) => {
                setFeeds(r.data);
            })
            .catch((e) => {
                toast.error("Error loading news feeds");
            });
    }, []);

    return (
        <div className="container-fluid" style={style}>
            <div className="row">
                <div className="col-12">
                    <Navbar />
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 col-lg-8 offset-lg-2">
                            {feeds &&
                                feeds.map((f, i) => (
                                    <FeedCard feed={f} key={i} />
                                ))}
                            {feeds && feeds.length === 0 && (
                                <h5>No newsfeeds at the moment</h5>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NewsFeedPage;
