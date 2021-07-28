export default function studentLeaveTeam(axios, data) {
    return axios.post("/team/leave/student", data);
}
