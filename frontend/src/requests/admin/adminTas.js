export function adminGetTas(axios){
    return axios.get("/admin/supervisor/ta");
}

export function adminAddTa(axios,data){
    return axios.post("/admin/supervisor/ta/add",data);
}

export function adminEditSupervise(axios,data){
    return axios.post("/admin/supervisor/edit",data);
}