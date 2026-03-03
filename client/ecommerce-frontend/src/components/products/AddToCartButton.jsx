"use client"

import { useCart } from "@/context/CartContext"
import { Button } from "../ui/button"

const AddToCartButton = ({product}) => {


    const { addToCart } = useCart()

    return(
        <Button onClick={() => addToCart(product)}>
            Add to Cart
        </Button>
    )
}

export default AddToCartButton