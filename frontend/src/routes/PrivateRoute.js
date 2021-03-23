import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import {AuthContext} from "context";
import {adminLoginRoute, loginRoute} from "./routes";

const PrivateRoute = ({component, admin, user, ...rest}) => {
    const {auth} = useContext(AuthContext);
    const correctUser =
        (auth.account_type === "ADMIN" && admin) ||
        (auth.account_type !== "ADMIN" && user);

    if (auth.is_logged_in && correctUser) {
        return <Route {...rest} component={component} />;
    } else if (user) {
        return <Redirect to={loginRoute} />;
    } else if (admin) {
        return <Redirect to={adminLoginRoute} />;
    }
};

export default PrivateRoute;
