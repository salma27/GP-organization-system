export default function getOneSupervisor(axios, data) {
    return axios.get(`/supervisor/${data.id}`, data);
}
