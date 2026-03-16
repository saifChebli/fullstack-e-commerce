'use client'

import api from "@/lib/axios";
import { createContext , useContext , useState , useEffect , useRef} from "react";
import { useSession } from "next-auth/react";

const AuthContext = createContext()





export const AuthProvider = ({children}) => {

    const [user , setUser] = useState(null)
    const [loading , setLoading] = useState(true)
     
    const { data : session , status} = useSession()



    // Prevent Google from firing more than one per session
    const googleAuthDone = useRef(false)

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



    useEffect(() => {
       if(!loading && status === "authenticated" && session?.backendUser && !user && !googleAuthDone.current){
           googleAuthDone.current = true
           api.post("/auth/google" , {name : session.user.name , email : session.user.email})
           .then((res) => {
            setUser(res.data.user)
           })
           .catch(() => {
             setUser(session.backendUser)
           })
       }
    },[session , status , user , loading])


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