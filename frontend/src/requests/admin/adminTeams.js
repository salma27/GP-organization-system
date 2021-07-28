export function adminGetTeams(axios,data){
    return axios.post("/team/admin",data);
}