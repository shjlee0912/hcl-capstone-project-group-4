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
        return axios.post(url+"/products", data, {withCredentials: true, headers: {Authorization: "Bearer "+localStorage.getItem("jwt")}});
    }

    addImage(id, image){
        const data = new FormData();
        data.append("image", image);
        return axios.post(url+`/products_image/${id}`, data, {withCredentials: true, headers: {Authorization: "Bearer "+localStorage.getItem("jwt")}});
    }

    update(id, data){
        return axios.put(url+`/products/${id}`, data);
    }

    delete(id){
        return axios.delete(url+`/products/${id}`);
    }
}


export default new ProductService();