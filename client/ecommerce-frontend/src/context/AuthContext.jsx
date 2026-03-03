'use client'

import api from "@/lib/axios";
import { createContext , useContext , useState , useEffect } from "react";


const AuthContext = createContext()





export const AuthProvider = ({children}) => {

    const [user , setUser] = useState(null)
    const [loading , setLoading] = useState(true)


    const getMe = async () => {
        try {
            const response = await api.get("/auth/me")
            setUser(response.data.user)
        } catch (error) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }   

    useEffect(() => {
        getMe()
    },[])


    const login = async (values) => {
        const response = await api.post('/auth/login' , values)
        setUser(response.data.user)
        return response
    }

    const signup = async (values) => {
        return await api.post('/auth/signup', values)
    }

    const logout = async () => {
        await api.post('/auth/logout')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user , loading , login , signup , logout}}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => useContext(AuthContext)