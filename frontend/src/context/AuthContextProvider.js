import React, {useEffect} from "react";
import AuthContext from "./AuthContext";
import {useAuthentication} from "hooks";
import {useCookies} from "react-cookie";

const AuthContextProvider = ({children}) => {
    const [cookies, setCookie] = useCookies([
        "access_token",
        "is_logged_in",
        "account_type",
    ]);

    const defaultAuthState = {
        access_token: cookies.access_token || null,
        is_logged_in: cookies.is_logged_in === "true" || false,
        account_type: cookies.account_type || false,
    };
    const authObj = useAuthentication(defaultAuthState);
    const {auth} = authObj;

    useEffect(() => {
        for (const key in auth) {
            let config = {
                path: "/",
            };
            setCookie(key, auth[key], config);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);
    return (
        <AuthContext.Provider value={authObj}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;
