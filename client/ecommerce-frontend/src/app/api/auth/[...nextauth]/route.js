import api from "@/lib/axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      // use env vars - never hardcoded credentials
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && user) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
            { name : user.name , email : user.email },
           // server to server : no browser cookie needed here
          );

         if(response?.data) {
             token.backendUser = response.data.user
             token.backendToken = response.data.token // if Express backend give us a token we will save it inside 'token'
         }
              

        } catch (error) {
            console.log(error.message)
            return { ...token , error : 'Backend auth failed'}
        }
      }

      return token
    },
    async session({session , token}){
        if(token?.backendUser){
            session.backendUser = token.backendUser
        }

        if(token?.backendToken){
            session.backendToken = token.backendToken // if Express backend give us a token we will save it inside 'session'
        }
        
        return session
    }
  },
  pages : {
    signIn : '/login'
  },
  secret : process.env.NEXT_PUBLIC_NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };
