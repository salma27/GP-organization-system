import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSpecificTechnology } from "requests";
import useRequest from "./useRequest";

const useSpecificTechnology = (id)=>{
    const [tech,setTech] = useState({});
    const [request,requesting] = useRequest(getSpecificTechnology);
    useEffect(() => {
        request({id:id})
        .then(res=>{
            setTech(res.data);
        })
        .catch((e) =>{
            // toast.error("Error getting technologies");
        })
    }, [])
    return [tech];
}

export default useSpecificTechnology;