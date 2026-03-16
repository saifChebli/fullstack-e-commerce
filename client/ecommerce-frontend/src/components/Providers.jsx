'use client'

import { SessionProvider } from "next-auth/react"
import { CartProvider } from "@/context/CartContext"
import { AuthProvider } from "@/context/AuthContext"


export default function Providers({children}){

    return (
        <SessionProvider>
            <AuthProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </AuthProvider>
        </SessionProvider>
    )
   
}