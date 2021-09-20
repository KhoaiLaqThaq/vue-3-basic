export default function authHeader() {
    // return authorization header with jwt token
    const userToken = localStorage.getItem("user");
    if (userToken) {
        let user = JSON.parse(userToken);
        if (user && user.token) {
            return { 'Authorization': "Bearer " + user.token };
        } else {
            return {};
        }
    }
}