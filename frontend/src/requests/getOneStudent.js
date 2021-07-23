export default function getOneStudent(axios, data) {
    return axios.get(`/student/${data.id}`, data);
}
