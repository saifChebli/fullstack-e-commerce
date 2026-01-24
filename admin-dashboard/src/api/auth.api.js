// API Layer E-Commerce Project
import api from "./axios"

// Login
export const login = async (email , password) => {
    try {
        const response = await api.post(`/auth/login` , {email , password})
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const getMe = async () => {
    try {
        const response = await api.get(`/auth/me`)
        return response.data
    } catch (error) {
         console.log(error)
    }
}