export function staffGetItsTeams(axios,data){
    return axios.post("/team/supervisor",data);
}