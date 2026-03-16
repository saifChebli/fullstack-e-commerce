'use client'

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"


import { Card , CardContent } from '@/components/ui/card'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast }  from "sonner"

import { signIn } from 'next-auth/react'

import { useTranslations } from 'next-intl'

export default function LoginPage(){

    const t = useTranslations("auth")
    
    const { login } = useAuth()
    const router = useRouter()

    const [form , setForm] = useState({email : "" , password : ""})
    const [loadingGoogle , setLoadingGoogle] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login(form)
            router.push("/")
        } catch (error) {
            toast(error.message)
        }
    }

    const handleGoogleSignIn = async () => {
        setLoadingGoogle(true)
        try {
            await signIn('google' , { callbackUrl : "/"}) 
        } catch (error) {
            toast.error('Google sign in failed')
            console.log(error)
            
        }finally {
            setLoadingGoogle(false)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
             <Card className='w-[400px] p-6'>
                <CardContent className='space-y-4'>
                    <h2 className="text-xl font-semibold">{t('welcome')}</h2>

                    <Input onChange={(e) => setForm({...form , email : e.target.value})} type='email' placeholder="Email" />

                    <Input onChange={(e) => setForm({...form , password : e.target.value})} type='password' placeholder="********"/>

                    <Button onClick={handleSubmit} className='w-full'>
                        {t("login")}
                    </Button>

                    <Button onClick={handleGoogleSignIn} disabled={loadingGoogle} className='w-full' variant="outline">
                        {loadingGoogle ? 'Redirecting...' : t("continue_google")}
                    </Button>
                </CardContent>
             </Card>
        </div>
    )
}