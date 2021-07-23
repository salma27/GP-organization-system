export default function StudentRequestToJoinTeam(axios, data) {
    return axios.post("/team/join", data);
}
