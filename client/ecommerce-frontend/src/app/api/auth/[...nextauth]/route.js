import api from "@/lib/axios";
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth'




const handler = NextAuth({
    providers : [
        GoogleProvider({
            clientId : process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret : process.env.NEXT_PUBLIC_CLIENT_SECRET
        })
    ],

    callbacks : {
        async signIn({user}) {
            try {
                // Send Google user to our backend
                await api.post('/auth/google' ,{ name : user.name , email : user.email})
                return true
            } catch (error) {
                return false
            }
        }
    }
})

export { handler as GET , handler as POST }