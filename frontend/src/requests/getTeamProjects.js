export default function getTeamProjects(axios, data) {
    return axios.post("/team/project", data);
}
