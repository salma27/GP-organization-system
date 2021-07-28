import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllDepartments } from "requests";
import { useRequest } from "hooks";

const useDepartments = () => {
    const [departments, setDepartments] = useState([]);
    const [departmentsLabelValue, setDepartmentsLabelValue] = useState([]);
    const [request, requesting] = useRequest(getAllDepartments);
    useEffect(() => {
        request()
            .then((r) => {
                // console.log(r.data)
                setDepartments(r.data);
                const valueObj = r.data.map((d) => {
                    return { label: d.name, value: d.id };
                });
                setDepartmentsLabelValue(valueObj);
            })
            .catch((e) => {
                toast.error("Error getting departments");
            });
    }, []);
    return [departments, requesting, departmentsLabelValue];
};

export default useDepartments;
