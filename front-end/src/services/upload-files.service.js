import axios from 'axios';
import {url} from '../config/config.js';

class UploadFilesService{
    upload(file, onUploadProgress){
        let formData = new FormData();
        formData.append("file", file);
        return axios.post(url+"/product_image/{id}");
    }
}

export default new UploadFilesService();