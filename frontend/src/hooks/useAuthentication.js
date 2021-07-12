import {useCookies} from "react-cookie";
import {useCallback} from "react";
import {useState} from "react";

const useAuthentication = (defaultAuth) => {
    const [auth, setAuth] = useState(defaultAuth);
    const [, setCookie] = useCookies([
        "access_token",
        "is_logged_in",
        "account_type",
    ]);
    const setAuthCookies = useCallback(
        (data) => {
            return new Promise((resolve) => {
                let config = {
                    path: "/",
                };
                for (const key in data) {
                    setCookie(key, data[key], config);
                }
                setAuth(data)
                    // .then(() => {
                        resolve();
                    // })
                    // .catch(() => {});
            });
        },
        [auth]
    );

    return {auth, setAuth: setAuthCookies};
};

export default useAuthentication;
