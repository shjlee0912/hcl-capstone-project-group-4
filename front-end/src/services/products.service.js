import axios from 'axios';
import {url} from '../config/config.js';

class ProductService {
    getProducts(filter, sort) {
        return axios.post(url+"/products_sorted?sort="+sort, filter);
    }

    getCategories() {
        return axios.get(url+"/categories");
    }

    create(data){
        return axios.post("/products", data);
    }

    update(id, data){
        return axios.put(`/products/${id}`, data);
    }

    delete(id){
        return axios.delete(`/products/${id}`);
    }
}


export default new ProductService();