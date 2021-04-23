export default function EditProjectRequests(axios, data) {
    let type = data ? data.type : "";
    switch (type) {
        case "ADMIN":
            break;

        default:
            return axios.post("/user/auth", data);
    }
}
