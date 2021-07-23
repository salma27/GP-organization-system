export default function AskToBeMySupervisor(axios, data) {
    return axios.post("/team/request-to-be-supervisor/dr", data);
}
