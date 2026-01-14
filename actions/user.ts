"use server"

import { fetchCurrentUser } from "@/lib/routes/auth"
import { auth } from "@/lib/auth"

export const getUser = async () => {
    const session = await auth()

    if (!session || !session.user) {
        return null
    }

    const data = await fetchCurrentUser()
    return data
}