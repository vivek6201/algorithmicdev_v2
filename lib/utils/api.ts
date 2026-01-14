import axios, { AxiosResponse, type Method } from "axios"

interface ApiClientOptions {
    endpoint: string
    method?: Method
    body?: any
    params?: any
    headers?: Record<string, string>
}


export const apiClient = async <T>({
    endpoint,
    method = "GET",
    body,
    params,
    headers: customHeaders,
}: ApiClientOptions): Promise<AxiosResponse<T>> => {
    const isServer = typeof window === "undefined"
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...customHeaders,
    }

    if (isServer) {
        // Server-side: Use auth() to get session
        const { auth } = await import("@/lib/auth")
        const session = await auth()
        if (session?.accessToken) {
            headers["Authorization"] = `Bearer ${session.accessToken}`
        }
    } else {
        // Client-side: Use getSession()
        const { getSession } = await import("next-auth/react")
        const session = await getSession()
        if (session?.accessToken) {
            headers["Authorization"] = `Bearer ${session.accessToken}`
        }
    }

    const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

    const client = axios.create({
        baseURL: BASE_URL,
        headers,
    })

    const response = await client.request<T>({
        url: endpoint,
        method,
        data: body,
        params,
    })

    return response
}