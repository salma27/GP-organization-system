export default function getProjectsProvidedbySupervisor(axios, data) {
    return axios.get(`/project/supervisor/${data.id}`, data);
}
