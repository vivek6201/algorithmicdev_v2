"use server"

import { fetchCurrentUser } from "@/lib/routes/auth"
import { cookies } from "next/headers"

export const getUser = async () => {
    const cookieStore = await cookies()
    const access_token = cookieStore.get("access_token")?.value
    const refresh_token = cookieStore.get("refresh_token")?.value

    if (!access_token && !refresh_token) {
        return null
    }

    const data = await fetchCurrentUser()
    return data
}