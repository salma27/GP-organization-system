import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllDepartments } from "requests";
import {useRequest} from "hooks";

const useDepartments = () => {
    const [departments, setDepartments] = useState([]);
    const [request, requesting] = useRequest(getAllDepartments);
    useEffect(() => {
        request()
            .then((r) => {
                // console.log(r.data)
                setDepartments(r.data);
            })
            .catch((e) => {
                toast.error("Error getting departments");
            });
    }, []);
    return [departments];
};

export default useDepartments;