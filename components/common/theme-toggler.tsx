"use client"

import { useTheme } from 'next-themes'
import { Button } from '../ui/button'
import { Moon, Sun } from 'lucide-react'

function ThemeToggler() {
    const { setTheme, theme } = useTheme()

    return (
        <Button size={"icon"} variant={"outline"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
    )
}

export default ThemeToggler