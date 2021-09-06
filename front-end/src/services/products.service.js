import axios from 'axios';
import {url} from '../config/config.js';

class ProductService {
    getProducts(filter) {
        return axios.get(url+"/products");
    }

    getCategories() {
        return axios.get(url+"/categories");
    }
}

export default new ProductService();