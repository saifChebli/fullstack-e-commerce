import { Button } from "../ui/button"
import  Link  from 'next/link'



export default function Hero() {
    return (
        <section className="bg-gray-100 py-20">
            <div className="container max-auto grid md:grid-cols-2 items-center gap-10 px-4">
                <div>
                    <h1 className="text-5xl font-bold leading-tight">Discover the Best Products</h1>
                    <p className="mt-6 text-gray-600">Shop the latest trends with high quality</p>
                    <Link href='/products'>
                        <Button className='mt-8'>
                            Shop Now
                        </Button>
                    </Link>
                
                </div>
                <div>
                  <img className="rounded-lg shadow-lg" src="https://www.lummi.ai/api/render/image/cd777016-a056-49ed-aa3a-1191ffdb136a?token=eyJhbGciOiJIUzI1NiJ9.eyJpZHMiOlsiY2Q3NzcwMTYtYTA1Ni00OWVkLWFhM2EtMTE5MWZmZGIxMzZhIl0sInJlc29sdXRpb24iOiJtZWRpdW0iLCJyZW5kZXJTcGVjcyI6eyJlZmZlY3RzIjp7InJlZnJhbWUiOnt9fX0sInNob3VsZEF1dG9Eb3dubG9hZCI6ZmFsc2UsImp0aSI6Ik5YU1h0NjZ0MTNFTlc3d2RwQVY3aiIsImlhdCI6MTc3MTQ0NDU2NCwiZXhwIjoxNzcxNDQ0NjI0fQ.RcIpB5GmEIKIeflZcNRf9m1rQYn1F9oNorqoa8oeAYk" alt="" />
                </div>
            </div>
        </section>
    )
}