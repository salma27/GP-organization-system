export default function getAllTechnologies(axios, data) {
    return axios.get("/technology", data);
}
