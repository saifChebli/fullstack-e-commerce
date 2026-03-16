import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'

const locales = ["en" , "fr"]
const defaultLocale = "en"


const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix : "always" // URL will always have /en or /fr prefix
})


export default function middleware(request){
    return intlMiddleware(request)
}

export const config = {
    matcher: '/((?!api|_next|_vercel|.*\\..*).*)'
}