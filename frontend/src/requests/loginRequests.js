import { TYPES } from "utils";

export default function loginRequests(axios, { type, ...data }) {
    console.log(type);
    switch (type) {
        case TYPES.STUDENT:
            return axios.post("/student/auth/login", data);
        case TYPES.STAFF:
            return axios.post("/supervisor/auth/login", data);
        default:
            return axios.post("/", data);
    }
}
