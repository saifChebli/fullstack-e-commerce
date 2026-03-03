"use client"


import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";


export default function Header(){


    const { openCart , cart } = useCart()
    return (
        <header className="bg-black text-white p-4 flex justify-between">
            <Link href='/' className="text-xl font-bold">
                MongoTango
            </Link>
            <button onClick={openCart} className="relative">
                <ShoppingCart />
                {
                    cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-white text-black text-xs px-2 py-0.5 rounded-full ">
                            {cart.length}
                        </span>
                    )
                }
            </button>
        </header>
    )
}