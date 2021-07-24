export function staffGetDoctorProjects(axios,data){
    return axios.post("/supervisor/project/",data);
}

export function staffAddDoctorProject(axios,data){
    return axios.post("/supervisor/project/add",data);
}