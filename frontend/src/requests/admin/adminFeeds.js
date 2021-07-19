export function adminGetFeeds(axios){
    return axios.get("/feed");
}

export function adminAddFeed(axios,data){
    return axios.post("/admin/feed/add",data);
}