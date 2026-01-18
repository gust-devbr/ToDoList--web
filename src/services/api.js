import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-todolist-nygg.onrender.com'
});

export default api;