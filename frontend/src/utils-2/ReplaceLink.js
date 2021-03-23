import React from "react";
import {useHistory} from "react-router-dom";
import backURL from "./backURL";

const ReplaceLink = ({to, children, relative, ...rest}) => {
    const back = backURL();
    const next = back + to;
    const history = useHistory();
    const link = (e) => {
        e.preventDefault();
        history.replace(relative ? next : to);
    };
    return (
        <a {...rest} href="/not-found" onClick={link}>
            {children}
        </a>
    );
};
export default ReplaceLink;
