export function staffgetProfile(axios, data) {
    return axios.post("/supervisor/profile", data);
}
