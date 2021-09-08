import axios from 'axios';
import {url} from '../config/config.js';

class OrdersService {

    placeOrder(orderobj) {
        return axios.post(`${url}/order`, orderobj, {withCredentials: true, headers: {Authorization: "Bearer "+localStorage.getItem("jwt")}});
    }

    createShippingAddress(addr) {
        return axios.post(`${url}/shipping_address`, addr, {withCredentials: true, headers: {Authorization: "Bearer "+localStorage.getItem("jwt")}});
    }

}

export default new OrdersService();