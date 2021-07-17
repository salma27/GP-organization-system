import { useContext, useState } from "react";
import useAxios from "./useAxios";
import { AuthContext } from "context";

export default function useRequest(request, load = false) {
    const axios = useAxios();
    const [isProcessing, setIsProcessing] = useState(false);
    const { setAuth } = useContext(AuthContext);
    // console.log("b4 userequest");

    const send = async (data) => {
        // console.log("in userequest");
        setIsProcessing(true);
        if (load)
            document
                .getElementById("loader")
                .classList.add("loading-indicator");
        const response = request(axios, data)
            .catch((e) => {
                // console.log({...e});
                switch (e.response.status) {
                    case 401:
                        // Invalidate access tokens etc...
                        setAuth({
                            access_token: null,
                            is_logged_in: false,
                            account_type: 0
                        });
                        break;
                    default:
                        break;
                }
                throw e;
            })
            .finally(() => {
                setIsProcessing(false);
                if (load)
                    document
                        .getElementById("loader")
                        .classList.remove("loading-indicator");
            });
        return response;
    };
    return [send, isProcessing];
}
