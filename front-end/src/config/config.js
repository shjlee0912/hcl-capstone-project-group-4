
const dev = {
    API_URL: "http://localhost:9191"
}

const prod = {
    API_URL: process.env.API_URL
}

const CONFIG = process.env.REACT_APP_STAGE==="prod"?prod:dev;
export const url = CONFIG.API_URL;
export default CONFIG;
