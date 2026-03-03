'use client'

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

import { Card , CardContent } from '@/components/ui/card'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast }  from "sonner"

import { signIn } from 'next-auth/react'

export default function LoginPage(){

    const { login } = useAuth()
    const router = useRouter()

    const [form , setForm] = useState({email : "" , password : ""})


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(form)
            router.push("/")
        } catch (error) {
            toast(error.response.data.message)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
             <Card className='w-[400px] p-6'>
                <CardContent className='space-y-4'>
                    <h2 className="text-xl font-semibold">Welcome Back</h2>

                    <Input onChange={(e) => setForm({...form , email : e.target.value})} type='email' placeholder="Email" />

                    <Input onChange={(e) => setForm({...form , password : e.target.value})} type='password' placeholder="********"/>

                    <Button onClick={handleSubmit} className='w-full'>
                        Login
                    </Button>

                    <Button onClick={() => window.location.href = "/api/auth/signin/google"} className='w-full' variant="outline">
                        Continue with Google
                    </Button>
                </CardContent>
             </Card>
        </div>
    )
}