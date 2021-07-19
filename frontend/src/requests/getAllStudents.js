export default function getAllStudents(axios, data) {
    return axios.get("/student", data);
}
