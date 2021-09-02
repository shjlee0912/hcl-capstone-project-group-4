
//contains location of Spring Boot api.
//This configuration will need to be updated to support deployment soon
const dev = {
    API_URL: "http://localhost:9191"
}

const prod = {}

const CONFIG = process.env.REACT_APP_STAGE==="prod"?prod:dev;
export const url = CONFIG.API_URL;
export default CONFIG;
