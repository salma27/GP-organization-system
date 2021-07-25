import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRequest } from "hooks";

const useYears = () => {
    const [years, setYears] = useState([]);
    const [yearsLabelValue, setYearsLabelValue] = useState([]);
    const [request, requesting] = useRequest((axios, data) =>
        axios.get("/project/years")
    );
    useEffect(() => {
        request()
            .then((r) => {
                // console.log(r.data)
                setYears(r.data.years);
                const valueObj = r.data.years.map((d) => {
                    return { label: d.toString(), value: d };
                });
                setYearsLabelValue(valueObj);
            })
            .catch((e) => {
                toast.error("Error getting years");
            });
    }, []);
    return [years, requesting, yearsLabelValue];
};

export default useYears;
