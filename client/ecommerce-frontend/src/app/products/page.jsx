import ProductCard from "@/components/products/ProductCard"
import axios from "axios"


async function getProducts() {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/all-products`)

    if (!response.data) throw new Error("Failed to get products")

    return response.data
}


export default async function ProductsPage(){

const products = await getProducts()
    
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">All Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))
                }
            </div>
        </div>
    )
}