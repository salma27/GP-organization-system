export function adminGetStudents(axios,data){
    return axios.post("/admin/student",data);
}