export function staffGetStudentProjects(axios,data){
    return axios.post("/supervisor/project/student-projects",data);
}