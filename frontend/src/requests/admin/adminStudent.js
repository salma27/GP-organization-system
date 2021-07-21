export function adminGetStudents(axios,data){
    return axios.post("/admin/student",data);
}

export function adminAddStudent(axios,data){
    return axios.post("/admin/student/add",data);
}

export function adminDeleteStudent(axios,data){
    return axios.post("/admin/student/delete",data);
}