"use client"

import ThemeToggler from "@/components/common/theme-toggler"
import Link from "next/link"

export default function Header() {
    return (
        <div className="h-16 flex items-center justify-between p-4  border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
            <Link href="/" className="flex items-center gap-2 group mr-4">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-foreground">
                    AlgorithmicDev
                </span>
            </Link>
            <ThemeToggler />
        </div>
    )
}
