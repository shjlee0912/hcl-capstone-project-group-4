// import axios from 'axios';
// import {url} from '../config/config.js';

// class ProductService {
//     getProducts(filter) {
//         return axios.get(url+"/products");
//     }

//     getCategories() {
//         return axios.get(url+"/categories");
//     }
// }

import http from "../http-common";
class ProductService{
    getFiltered(filter){
        return http.get("/products");
    }
    create(data){
        return http.post("/products", data);
    }
    update(id, data){
        return http.put(`/products/${id}`, data);
    }
    delete(id){
        return http.delete(`/products/${id}`);
    }
}
export default new ProductService();