import axios from 'axios';
import {url} from '../config/config.js';

class ProductService {
    getProducts(filter) {
        return axios.get(url+"/products");
    }
}

export default new ProductService();