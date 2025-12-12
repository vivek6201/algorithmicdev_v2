"use client"

import { verifyEmail } from "@/lib/routes/auth"
import { CircleCheck, CircleX, Loader } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"


export default function VerifyEmailClient() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const [loading, setLoading] = useState(false)
    const uiRef = useRef<boolean>(false)

    useEffect(() => {
        if (!token || uiRef.current) return
        setLoading(true);
        verifyEmail(token).then((data) => {
            if (data.success) {
                uiRef.current = true
            } else {
                uiRef.current = false
            }
        }).catch((e) => {
            console.log(e)
            uiRef.current = false
        }).finally(() => {
            setLoading(false)
        })
    }, [token, uiRef])

    if (loading)
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Loader className="animate-spin text-2xl" />
            </div>
        )

    if (!uiRef.current) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center">
                <CircleX className="text-2xl" />
                <p className="font-bold text-xl">Something went wrong</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <CircleCheck className="text-2xl" />
            <p className="font-bold text-xl">Email verified successfully</p>
        </div>
    )
}
