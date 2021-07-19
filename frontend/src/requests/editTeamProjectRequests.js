export default function editTeamProjectRequests(axios, data) {
    return axios.post("/team/project/edit", data);
}
