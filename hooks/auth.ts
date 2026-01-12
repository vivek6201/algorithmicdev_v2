"use client"

import { getUser } from "@/actions/user"
import { logoutUser } from "@/lib/routes/auth"
import { useUserStore } from "@/store/user"

export const useAuth = () => {
    const { setUser, clearUser, setLoading } = useUserStore()

    async function fetchUser() {
        setLoading(true)
        try {
            const data = await getUser()
            if (data.success && data.data) {
                setUser(data.data)
            } else {
                clearUser()
            }
        } catch (error) {
            console.error("Failed to fetch user:", error)
            clearUser()
        } finally {
            setLoading(false)
        }
    }

    return { fetchUser };
} 