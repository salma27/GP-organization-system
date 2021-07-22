export function adminDeleteTechnology (axios,data){
    return axios.post("/admin/technology/delete",data);
}

export function adminAddTechnology(axios,data){
    return axios.post("/admin/technology/add",data);
}

export function adminEditTechnology(axios,data){
    return axios.post("/admin/technology/edit",data)
}