export default function StudentAskToTakeSupervisorIdea(axios, data) {
    return axios.post("/team/take-main-project/dr", data);
}
