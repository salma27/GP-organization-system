
export default function getSpecificTechnology (axios,id){
    return axios.get(`/technology/${id}`);
}