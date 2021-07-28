export function staffGetItsTeams(axios,data){
    return axios.post("/team/supervisor",data);
}

export function staffLeaveTeam(axios,data){
    return axios.post("/team/leave/supervisor",data)
}