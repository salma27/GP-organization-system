export default function editStudentProfile(axios, data) {
    return axios.get("/student/edit", data);
}
