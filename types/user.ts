export enum Role {
    CANDIDATE = "CANDIDATE",
    RECRUITER = "RECRUITER",
}

export interface User {
    id: string
    email: string
    role: string
}

export interface UserProfile extends User {
    username: string
    name: string
    created_at: string
    updated_at: string
}

export interface LoginResponse {
    user: User
    tokens: {
        access_token: string
        refresh_token: string
        expires_in: number
    }
}