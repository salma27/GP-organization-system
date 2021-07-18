export default function deleteTeamProjectRequests(axios, data) {
    return axios.post("/team/project/delete", data);
}
