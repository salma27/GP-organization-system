export default function getAllStudents(axios, data) {
    return axios.post("/student/all", data);
}
