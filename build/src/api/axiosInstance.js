import axios from 'axios';
const axioInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL || 'http://localhost:4000', // Default fallback
    withCredentials: true,
});
export default axioInstance;
