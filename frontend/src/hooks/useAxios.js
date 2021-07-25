import { useContext, useState, useEffect } from "react";
import Axios from "axios";
import { AuthContext } from "context";

export default function useAxios() {


    //const baseURL = "http://192.168.1.11:8000";
    const baseURL = "http://localhost:8000";
    // const baseURL = "http://3533789ffb85.ngrok.io/";
    const {auth} = useContext(AuthContext);
    const {access_token} = {...auth};


    const defaultAxios = Axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: access_token,
        },
    });

    const [axios, setAxios] = useState({ instance: defaultAxios });
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
