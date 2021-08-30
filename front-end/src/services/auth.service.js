import axios from 'axios';
import {url} from '../config/config.js';

class AuthService {
    getItem() {axios.get("https://jsonplaceholder.typicode.com/todos/1")};
}

export default new AuthService();