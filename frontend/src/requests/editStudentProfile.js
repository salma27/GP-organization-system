export default function editStudentProfile(axios, data) {
    return axios.post("/student/edit", data);
}
