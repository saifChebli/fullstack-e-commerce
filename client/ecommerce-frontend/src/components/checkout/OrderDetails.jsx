'use client'

import { useCart } from "@/context/CartContext"
import { Card , CardContent , CardHeader , CardTitle } from "../ui/card"

const OrderDetails = () => {

    const { cart , totalPrice } = useCart()

  return (
    <Card className='h-fit shadow-xl rounded-2xl sticky top-10'>
        <CardHeader>
            <CardTitle className='text-xl'>Order Summary</CardTitle>
        </CardHeader>

        <CardContent className='space-y-4'>
            {
                cart.map(item => (
                    <div 
                        key={item._id}
                        className="flex justify-between text-center text-sm"
                    > 
                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-gray-500">{item.quantity}</p>
                        </div>

                        <p>${item.price * item.quantity}</p>
                    </div>
                ))
            }

            <hr />

            <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total</span>
                <span>${totalPrice}</span>
            </div>
        </CardContent>
    </Card>
  )
}

export default OrderDetails