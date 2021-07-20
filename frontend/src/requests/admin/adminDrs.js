export function adminGetDoctors(axios){
    return axios.get("/admin/supervisor/dr");
}

export function adminAddDoctor(axios,data){
    return axios.post("/admin/supervisor/dr/add",data);
}