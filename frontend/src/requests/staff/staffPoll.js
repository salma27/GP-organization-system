export function staffGetPolls(axios){
    return axios.get("/poll/supervisor");
}

export function staffVote(axios,data){
    return axios.post("/poll/vote/supervisor",data);
}