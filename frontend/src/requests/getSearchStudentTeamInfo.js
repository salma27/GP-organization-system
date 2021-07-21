export default function getSearchStudentTeamInfo(axios, data) {
    return axios.get(`/team/${data.id}`, data);
}
