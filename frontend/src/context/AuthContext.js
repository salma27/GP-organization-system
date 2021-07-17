import { createContext } from "react";

const AuthContext = createContext({
    access_token: null,
    is_logged_in: false,
    account_type: 0,
});

export default AuthContext;
