export default function getAllTAs(axios, data) {
    return axios.post("/supervisor/ta", data);
}
