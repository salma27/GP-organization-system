export function TARequestToBeSuberVisor(axios,data){
    return axios.post("/team/supervise/ta",data);
}