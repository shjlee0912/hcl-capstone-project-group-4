import axios from 'axios';
import {url} from '../config/config.js';

class AuthService {
    login(username, password) {
        return axios.post(url+"/authenticate", {username: username, password: password}, {withCredentials: true})
    };

    register(user) {
        return axios.post(url+"/register", user, {withCredentials: true})
    };

    getUserInfo() {
        return axios.get(url+"/user", {withCredentials: true, headers: {Authorization: "Bearer "+localStorage.getItem("jwt")}});
    }
}


export default new AuthService();