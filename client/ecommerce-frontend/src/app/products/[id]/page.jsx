import AddToCartButton from "@/components/products/AddToCartButton";
import { Button } from "@/components/ui/button";
import axios from "axios";

async function getProduct(id) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/product/${id}`,
  );

  if (!response.data) throw new Error("Failed to fetch product");

  return response.data;
}

export default async function ProductDetails({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10">
            {/* Images */}
            <div>
                <img className="w-full h-[400px] object-cover rounded-xl" src={`${process.env.NEXT_PUBLIC_BASE_URL}${product.image[0]}`} alt={product.name} />
                <div className="grid grid-cols-4 gap-3 mt-4">
                    {product.image.map(img => (
                        <img className="h-24 w-full object-cover rounded-md" src={`${process.env.NEXT_PUBLIC_BASE_URL}${img}`} alt="" />
                    ))}
                </div>
            
            </div>

            {/* Info */}

            <div>
                <h1 className="text-3xl font-semibold mb-4">
                    {product.name}
                </h1>

                <p className="text-gray-600 mb-4">
                    {product.description}
                </p>

                <div className="text-2xl font-bold mb-4">
                    ${product.price}
                </div>

                <p className="mb-2">
                   Category : {product.category?.name}
                </p>

                <p className="mb-4">
                    Stock : {product.stock}
                </p>

                <AddToCartButton product={product} />
            </div>
      </div>
    </div>
  );
}
