import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-todolist-production.up.railway.app'
});

export default api;