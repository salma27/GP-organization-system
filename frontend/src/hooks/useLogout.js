import {AuthContext} from "context";
import {useContext} from "react";
import {useHistory} from "react-router-dom";
import {useCookies} from "react-cookie";
import {toast} from "react-toastify";

const useLogout = () => {
    const cookies = ["access_token", "is_logged_in", "account_type"];
    const {auth, setAuth} = useContext(AuthContext);
    const history = useHistory();
    const [, , removeCookie] = useCookies(cookies);
    const type = auth.account_type;

    const clearCookies = () => {
        for (const key in cookies) {
            removeCookie(cookies[key]);
            console.log("Removed ", cookies[key]);
        }

        setAuth({
            access_token: null,
            refresh_token: null,
            is_logged_in: false,
        });
        if (type === "ADMIN") history.push("/admin/login");
        else history.push("/login");
    };
    const logout = (request) => {
        request()
            .then((r) => {
                clearCookies();
            })
            .catch((e) => {
                toast.error("An error occurred while logging out");
            });
    };
    return {logout, clearCookies};
};

export default useLogout;
