
const dev = {
    API_URL: process.env.REACT_APP_API_URL || "http://localhost:9191",
    STRIPE_KEY: process.env.REACT_APP_PUB_STRIPE_KEY || "pk_test_51JWj0pIEb7HWAVreamX2kRQvYtCcTNqh4nKSIpruKIYMN8ZIxX8WZ4fNcbtTyS8oDG4Jf0LKQw4jRDQAizpIAI4300ONv9IY9p",
}

const prod = {
    API_URL: process.env.REACT_APP_API_URL,
    STRIPE_KEY: process.env.REACT_APP_PUB_STRIPE_KEY,
}

const CONFIG = process.env.REACT_APP_STAGE==="prod"?prod:dev;
export const url = CONFIG.API_URL;
export default CONFIG;
