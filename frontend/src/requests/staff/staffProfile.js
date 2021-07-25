export function staffgetProfile(axios, data) {
    return axios.post("/supervisor/profile", data);
}

export function staffEditProfile(axios, data){
    return axios.post("/supervisor/edit",data);
}
