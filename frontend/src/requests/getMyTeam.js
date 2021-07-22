export default function getMyTeam(axios, data) {
    return axios.post("/team/student", data);
}
