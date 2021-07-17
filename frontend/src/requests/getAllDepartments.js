export default function getAllDepartments(axios, data) {
    // console.log("in admin login request");
    return axios.post("/department", data); // {username: kza, password: kza}

}
