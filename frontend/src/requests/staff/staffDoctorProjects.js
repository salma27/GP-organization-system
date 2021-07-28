export function staffGetDoctorProjects(axios,data){
    return axios.post("/supervisor/project/",data);
}

export function staffAddDoctorProject(axios,data){
    return axios.post("/supervisor/project/add",data);
}

export function staffDeleteDoctorProject(axios,data){
    return axios.post("/supervisor/project/delete",data);
}

export function staffEditDoctorProject(axios,data){
    return axios.post("/supervisor/project/edit",data);
}