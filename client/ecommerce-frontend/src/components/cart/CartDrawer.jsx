"use client"


import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle
} from '@/components/ui/sheet'

import { useCart } from '@/context/CartContext'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import Link from 'next/link'



const CartDrawer = () => {


const { isCartOpen , closeCart , cart , removeFromCart , updateQuantity , totalPrice} = useCart()

    return (
        <Sheet open={isCartOpen} onOpenChange={closeCart}>
            <SheetContent side='right' className='flex flex-col w-[350px] p-2'>
                <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>

                <div className='flex-1 overflow-y-auto mt-4 space-y-4'>
                    {
                        cart.length === 0 ? (
                            <p className='text-center text-gray-500'>
                                Your cart is empty
                            </p>
                        ) : (
                            cart.map(item => (
                                <div key={item._id} className='flex gap-3 border rounded-md p-2'>
                                    <img className='w-16 h16 object-cover rounded-md' src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.image[0]}`} alt={item.name} />
                                
                                    <div className='flex-1'>
                                        <h3 className='text-sm font-semibold'>
                                            {item.name}
                                        </h3>
                                        <p className='text-sm text-gray-500'>
                                            ${item.price}
                                        </p>

                                        <div className='flex item-center gap-2 mt-2'>
                                            <Button onClick={() => updateQuantity(item._id , item.quantity - 1)}>
                                                -
                                            </Button>
                                            <span>{item.quantity}</span>
                                            <Button onClick={() => updateQuantity(item._id , item.quantity + 1)}>
                                                +
                                            </Button>
                                        </div>
                                    </div>
                                    <Button onClick={() => removeFromCart(item._id)}>
                                        <X />
                                    </Button>
                                </div>
                            ))
                        )
                    }
                </div>

                <div className='border-t pt-4 mt-4'>
                    <div className='flex justify-between mb-3 font-semibold'>
                        <span>Total</span>
                        <span>${totalPrice}</span>
                    </div>
                    <Link href='/checkout'>
                        <Button className='w-full'>Checkout</Button>
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    )

}


export default CartDrawer