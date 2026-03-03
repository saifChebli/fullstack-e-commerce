import Link from "next/link";
import  { Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent } from '@/components/ui/card'
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard ({product}){
    return (
        <Link href={`/products/${product._id}`}>
           <Card>
                <img className="w-full h-52 object-cover" src={`${process.env.NEXT_PUBLIC_BASE_URL}${product.image[0]}`} alt={product.name} />
                <CardHeader>
                    <CardAction>
                        <Badge variant="secondary">${product.price}</Badge>
                    </CardAction>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>
                        {product.description}
                    </CardDescription>
                </CardHeader>

                <CardFooter>
                    <AddToCartButton product={product} />
                </CardFooter>
           </Card>
        </Link>
    )
}