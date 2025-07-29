import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((config) => {
    config.headers['Cache-Control'] = 'no-store';
    return config;
});

export default api