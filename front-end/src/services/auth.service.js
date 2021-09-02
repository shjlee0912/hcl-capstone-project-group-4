import axios from 'axios';
import {url} from '../config/config.js';

class AuthService {
    login(username, password) {
        return axios.post(url+"/login", {username: username, password: password}, {withCredentials: true})
    };

    register(user) {
        return axios.post(url+"/regitster", user, {withCredentials: true})
    };

    logout() {
        return axios.post(url+"/logout", {withCredentials: true})
    };
}


export default new AuthService();