"use client"

import { ReactNode, useEffect, useState } from "react"
import { ThemeProvider } from "./theme-provider"

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
            {children}
        </ThemeProvider>
    )
}

export default Provider