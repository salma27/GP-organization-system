export default function adminGetOldProjects(axios, data) {
    // console.log("in admin login request");
    return axios.post("/admin/project",data); // {username: kza, password: kza}

}
