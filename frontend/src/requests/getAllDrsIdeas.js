export default function getAllDrsIdeas(axios, data) {
    return axios.post("/project/supervisors", data);
}
