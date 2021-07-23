export default function getAllDoctors(axios, data) {
    return axios.post("/supervisor/dr", data);
}
