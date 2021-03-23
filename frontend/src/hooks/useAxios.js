import {useContext, useState, useEffect} from "react";
import Axios from "axios";
import {AuthContext} from "context";

export default function useAxios() {
    const {auth} = useContext(AuthContext);
    const {access_token} = {...auth};

    const baseURL = "http://api.pointxcm.com/";

    const defaultAxios = Axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: access_token,
        },
    });

    const [axios, setAxios] = useState({instance: defaultAxios});
    useEffect(() => {
        setAxios({
            instance: Axios.create({
                baseURL,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: access_token,
                },
            }),
        });
    }, [access_token]);

    return axios.instance;
}
