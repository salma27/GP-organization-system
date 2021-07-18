export default function addTeamProjectRequests(axios, data) {
    return axios.post("/team/project/add", data);
}
