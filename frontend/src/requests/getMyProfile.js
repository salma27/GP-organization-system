export default function getMyProfile(axios, data) {
    return axios.post("/student/profile", data);
}
