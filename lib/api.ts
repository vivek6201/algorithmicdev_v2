import axios, { AxiosResponse, type Method } from "axios"
import { parse } from "set-cookie-parser"

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

    if (isServer && !headers["Cookie"]) {
        const { cookies } = await import("next/headers")
        const cookieStore = await cookies()
        headers["Cookie"] = cookieStore.toString()
    }

    const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

    const client = axios.create({
        baseURL: BASE_URL,
        headers,
        withCredentials: !isServer,
    })

    client.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true

                try {
                    // Attempt to refresh token
                    // We use a fresh axios call to avoid circular dependency or interceptor loops
                    const res = await axios.post(
                        `${BASE_URL}/api/auth/refresh`,
                        {},
                        {
                            withCredentials: !isServer,
                            headers: isServer ? { Cookie: headers["Cookie"] } : undefined,
                        }
                    )

                    if (isServer) {
                        const { cookies } = await import("next/headers")
                        const cookieStore = await cookies()
                        const cookiesData = parse(res.headers["set-cookie"] as string[])

                        //@ts-ignore
                        cookiesData.forEach(cookie => cookieStore.set(cookie.name, cookie.value, { ...cookie }))

                        // Update authorization header for the retry
                        if (originalRequest.headers) {
                            const newCookieHeader = cookiesData.map(c => `${c.name}=${c.value}`).join("; ")
                            originalRequest.headers["Cookie"] = newCookieHeader
                        }
                        headers["Cookie"] = cookieStore.toString()
                    }

                    // Retry original request
                    return client(originalRequest)
                } catch (refreshError) {
                    return Promise.reject(refreshError)
                }
            }

            return Promise.reject(error)
        }
    )

    const response = await client.request<T>({
        url: endpoint,
        method,
        data: body,
        params,
    })

    return response
}