import { createContext , useContext , useState , useEffect } from "react";
import { login , getMe } from "../api/auth.api";



const AuthContext = createContext()


export const AuthProvider = ({children}) => {

const [user , setUser] = useState(null)
const [loading , setLoading] = useState(true)


useEffect(() =>{
    const checkAuth = async () => {
        try {
            const res = await getMe() // cookie sent automatically
            setUser(res.user)
        } catch (error) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    checkAuth()
},[])

const isLogged = async (email , password) => {
    const res = await login(email , password) // login function return response.data

    if(res){
        setUser(res.user)
    }

    return res
}



    return (
        <AuthContext.Provider value={{ isLogged , user , loading}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)