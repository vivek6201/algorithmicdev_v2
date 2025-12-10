import { create } from 'zustand'
import { UserProfile } from '@/types/base'

interface UserState {
    user: UserProfile | null
    isLoading: boolean
    isAuthenticated: boolean
    setUser: (user: UserProfile) => void
    clearUser: () => void
    setLoading: (isLoading: boolean) => void
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: true, isLoading: false }),
    clearUser: () => set({ user: null, isAuthenticated: false, isLoading: false }),
    setLoading: (isLoading) => set({ isLoading }),
}))
