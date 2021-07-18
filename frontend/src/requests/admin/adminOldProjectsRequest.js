export default function adminGetOldProjects(axios, data) {
    // console.log("in admin login request");
    return axios.post("/admin/project",data); // {username: kza, password: kza}

}

export function adminAddOldProjects(axios,data){
    return axios.post("/admin/project/add",data)
}

export function adminDeleteOldProjects(axios,data){
    return axios.delete("/admin/project/delete",data)
}

export function adminEditOldProjects(axios,data){
    return axios.post("/admin/project/edit",data)
}