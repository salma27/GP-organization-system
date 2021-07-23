export default function getAllMyProjects_Student(axios, data) {
    return axios.post("/team/project", data);
}
