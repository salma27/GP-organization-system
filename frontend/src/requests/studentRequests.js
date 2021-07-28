export function getStudentRequest(axios){
    return axios.get("/poll");
}

export function studentVote(axios,data){
    return axios.post("/poll/vote",data);
}