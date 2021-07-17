export default function adminLoginRequest(axios, data) {
    // console.log("in admin login request");
    return axios.post("/admin/auth/login", data); // {username: kza, password: kza}

}
