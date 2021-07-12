import { AuthContext, TYPES } from "context";
import { useContext } from "react";

const useAuthContext = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const isStaff = auth.account_type == TYPES.STAFF;
    const isStudent = auth.account_type == TYPES.STUDENT;
    const isAdmin = auth.account_type == TYPES.ADMIN;
    
    return { auth, setAuth, isStaff, isAdmin, isStudent };
};
export default useAuthContext;
