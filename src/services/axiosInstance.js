import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://catalogoapi.desafio.utalk.chat/',
});

export default axiosInstance;