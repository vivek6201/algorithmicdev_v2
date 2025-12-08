"use client"

import { ReactNode, useEffect, useState } from "react"
import { ThemeProvider } from "./theme-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

function Provider({ children }: { children: ReactNode }) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        if (isMounted) return;
        setIsMounted(true)
    }, [])

    if (!isMounted) return null;

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default Provider