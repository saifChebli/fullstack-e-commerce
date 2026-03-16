'use client'

import { useAuth } from "@/context/AuthContext"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import CheckoutForm from "@/components/checkout/CheckoutForm"
import OrderDetails from "@/components/checkout/OrderDetails"


export default function CheckoutPage(){

    const { user , loading } = useAuth()
    const router = useRouter()

    useEffect(()=>{
        if (!loading && !user) router.push('/login')
    },[user,loading])

    if (loading) return null
    if (!user) return null

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                <CheckoutForm user={user}/>
                <OrderDetails />
            </div>
        </div>
    )
}