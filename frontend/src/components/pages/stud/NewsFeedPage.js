import {FeedCard} from "components/cards";
import {Navbar} from "components/navbar";
import React from "react";

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
const style = {
    // backgrounds from 1 to 5 i.e. feed_4
    backgroundImage: "url(/feed_7.svg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
};
const NewsFeedPage = () => {
    return (
        <div className="container-fluid" style={style}>
            <div className="row">
                <div className="col-12">
                    <Navbar />
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 col-lg-8 offset-lg-2">
                            {feeds.map((f, i) => (
                                <FeedCard {...f} key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NewsFeedPage;
