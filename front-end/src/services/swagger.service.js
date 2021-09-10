import axios from 'axios';
import {url} from '../config/config.js';

class SwaggerService {
    getSwaggerUi(){
        return axios.get(url+"/swagger-ui.html");
    }
}

export default new SwaggerService();