"use server"

import { fetchCurrentUser } from "@/lib/routes/auth"

export const getUser = async () => {
    const data = await fetchCurrentUser()
    return data
}