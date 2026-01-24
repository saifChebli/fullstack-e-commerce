import axios from 'axios'


// Automatically sends cookies
// Centralized configuration

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    withCredentials : true // Important : sends cookies automatically
})


export default api