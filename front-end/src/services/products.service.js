import axios from 'axios';
import {url} from '../config/config.js';

class ProductService {
    getProducts(filter, sort) {
        return axios.post(url+"/products_sorted?sort="+sort, filter);
    }

    getProductById(id){
        return axios.get(url+`/products/${id}`, {withCredentials: true, headers: {Authorization: "Bearer "+localStorage.getItem("jwt")}});
    }

    getCategories() {
        return axios.get(url+"/categories");
    }

    getCategoriesByName(names) {
        return axios.post(url+"/categories_by_name", names);
    }

    create(data){
        return axios.post(url+"/products", data, {withCredentials: true, headers: {Authorization: "Bearer "+localStorage.getItem("jwt")}});
    }

    addImage(id, image){
        const data = new FormData();
        data.append("image", image);
        return axios.post(url+`/products_image/${id}`, data, {withCredentials: true, headers: {Authorization: "Bearer "+localStorage.getItem("jwt")}});
    }

    update(id, data){
        return axios.put(url+`/products/${id}`, data, {withCredentials: true, headers: {Authorization: "Bearer "+localStorage.getItem("jwt")}});
    }

    delete(id){
        return axios.delete(url+`/products/${id}`, {withCredentials: true, headers: {Authorization: "Bearer "+localStorage.getItem("jwt")}});
    }
}


export default new ProductService();