import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllTechnologies } from "requests";
import useRequest from "./useRequest";

const useTechnology = () => {
    const [technologies, setTech] = useState([]);
    const [request, requesting] = useRequest(getAllTechnologies);
    useEffect(() => {
        request()
            .then((r) => {
                setTech(r.data);
            })
            .catch((e) => {
                toast.error("Error getting technologies");
            });
    }, []);
    return [technologies];
};

export default useTechnology;
