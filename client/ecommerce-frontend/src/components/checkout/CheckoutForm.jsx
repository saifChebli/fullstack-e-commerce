'use client'

import { Card , CardContent , CardHeader , CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Label } from "../ui/label"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { Separator } from "radix-ui"
import { toast } from "sonner"


import { useTranslations } from "next-intl"

const CheckoutForm = ({user}) => {

    const t = useTranslations("checkout")

    const [form , setForm] = useState({
        phone : "",
        city : "",
        address : ""
    })

    const [loading , setLoading] = useState(false)

    const { cart } = useCart()

    const handleChange = (e) => {
        setForm({...form , [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if(cart.length === 0) {
            toast.error('Your cart is empty')
            setLoading(false)
            return
        }

        try {

            // Step 1 : Create order in database


            // Step 2 : Create a Stripe Checkout Session for that order


            // Step 3 : Clear local cart and redirect to Stripe hosted checkout



        } catch(error){
            toast(error.message)
        } finally {
            setLoading(false)
        }
    }

  return (
    <Card className='shadow-xl rounded-2xl'>
        <CardHeader>
            <CardTitle className='text-2xl'>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
            {/* User Info */}
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>{t("name")}</Label>
                    <Input value={user.name} disabled/>
                </div>
                <div className="space-y-2">
                    <Label>{t("email")}</Label>
                    <Input value={user.email} disabled/>
                </div>
            </div>
            <hr />

            {/* Shipping */}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label>{t("phone")}</Label>
                    <Input 
                        placeholder='+216 00 000 000'
                        required
                        name='phone'
                        onChange={handleChange}
                    />
                </div>
                <div className="space-y-2">
                    <Label>{t("address")}</Label>
                    <Input 
                        placeholder='Street,Home'
                        required
                        name='address'
                        onChange={handleChange}
                    />
                </div>
                <div className="space-y-2">
                    <Label>{t("city")}</Label>
                    <Input 
                        placeholder='Tunis'
                        required
                        name='city'
                        onChange={handleChange}
                    />
                </div>

                <Button 
                    type='submit'
                    className='w-full mt-4 text-white text-lg'
                    disabled={loading}
                >
                    {loading ? 'Processing' : t("proceed")}
                </Button>
            </form>
        </CardContent>
    </Card>
  )
}

export default CheckoutForm