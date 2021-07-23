export default function getStudentNotificationList(axios, data) {
    return axios.get("/notification/student", data);
}
