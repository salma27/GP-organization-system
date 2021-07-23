export function doctorRequestToBeSuberVisorProject(axios,data){
    return axios.post("/team/supervise/dr",data);
}