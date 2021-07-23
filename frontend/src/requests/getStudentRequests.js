export default function getStudentRequests(axios, data) {
    return axios.get("/poll", data);
}
