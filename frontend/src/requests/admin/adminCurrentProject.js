export function adminGetCurrentProjects(axios,data){
    return axios.post("/admin/project/student-projects",data);
}