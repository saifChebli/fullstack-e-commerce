import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Spin } from "antd";



export const ProtectedRoutes = ({children}) => {
    const { user , loading } = useAuth()

    if(loading){
        return <Spin size="large" />
    }


    if (!user) return <Navigate to="/" replace/>;
    return children
}