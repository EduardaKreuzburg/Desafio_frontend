import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'https://apiprodutosutalk.herokuapp.com/',
    baseURL: process.env.REACT_APP_API_URL,
});

export default axiosInstance;