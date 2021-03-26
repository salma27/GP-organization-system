import {AuthContext} from "context";
import {useContext} from "react";

const useAuthContext = () => {
    const {auth, setAuth} = useContext(AuthContext);
    return [auth, setAuth];
};
export default useAuthContext;
