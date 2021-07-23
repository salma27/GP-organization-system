export default function getNewsFeeds(axios) {
    return axios.get("/feed");
}
