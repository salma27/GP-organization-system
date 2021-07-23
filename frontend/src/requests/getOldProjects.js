export default function getOldProjects(axios, data) {
    return axios.post("/project/all", data);
}
