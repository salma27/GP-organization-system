export function adminDeleteDepartment (axios,data){
    return axios.post("/admin/department/delete",data);
}

export function adminAddDepartment(axios,data){
    return axios.post("/admin/department/add",data);
}

export function adminEditDepartment(axios,data){
    return axios.post("/admin/department/edit",data)
}