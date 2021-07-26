export default function askTeamToAskTaToSupervise(axios, data) {
    return axios.post("/team/request-to-be-supervisor/ta", data);
}
