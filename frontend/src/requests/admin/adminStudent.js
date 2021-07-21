export function adminGetStudents(axios,data){
    return axios.post("/student/all",data);
}