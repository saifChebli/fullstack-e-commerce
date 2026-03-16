'use client'


import { useLocale } from "next-intl"
import { useRouter , usePathname} from 'next/navigation'


const locales = [
    {code : "en" , label : "En 🇬🇧"},
    {code : "fr" , label : "FR 🇫🇷"}
]


const LocaleSwitcher = () => {

    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const switchLocale = (newLocale) => {

        const newPath = pathname.replace(`/${locale}` , `/${newLocale}`)
        router.push(newPath)
    }

    return (
        <div>
            {
                locales.map(({code , label}) => (
                    <button
                        key={code}
                        onClick={() => switchLocale(code)}
                        className={`px-2 py-1 text-sm rounded ${locale === code ? "bg-gray-200 text-black" : "hover:bg-gray-800"}`}
                    >
                        {label}
                    </button>
                ))
            }
        </div>
    )
}


export default LocaleSwitcher