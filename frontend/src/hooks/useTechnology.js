import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllTechnologies } from "requests";
import useRequest from "./useRequest";

const useTechnology = () => {
    const [technologies, setTech] = useState([]);
    const [technologiesLabelValue, setTechnologiesLabelValue] = useState([]);
    const [request, requesting] = useRequest(getAllTechnologies);
    useEffect(() => {
        request()
            .then((r) => {
                setTech(r.data);
                const valueObj = r.data.map((d) => {
                    return { label: d.name, value: d.id };
                });
                setTechnologiesLabelValue(valueObj);
            })
            .catch((e) => {
                toast.error("Error getting technologies");
            });
    }, []);
    return [technologies, requesting, technologiesLabelValue];
};

export default useTechnology;
