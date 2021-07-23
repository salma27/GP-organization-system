export default function studentLeaveTeam(axios, data) {
    return axios.post("/student/profile", data);
}
