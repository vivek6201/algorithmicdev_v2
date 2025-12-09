"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export interface SidebarItemType {
    name: string
    link: string
    icon: LucideIcon
}

interface SidebarProps {
    items: SidebarItemType[]
    className?: string
}

function Sidebar({ items, className }: SidebarProps) {
    const pathname = usePathname()

    return (
        <aside className={cn("hidden md:flex flex-col w-16 h-full bg-sidebar border-r border-sidebar-border py-4 items-center gap-2 transition-all duration-300", className)}>
            <Link href="/">
                <Image src="/logo.png" width={20} height={20} alt="logo" className="rounded-full w-8 h-8 mb-5 mt-0.5" />
            </Link>
            {items.map((item) => {
                const isActive = item.link === "/"
                    ? pathname === "/"
                    : pathname === item.link || pathname.startsWith(`${item.link}/`)
                const Icon = item.icon

                return (
                    <Link
                        key={item.link}
                        href={item.link}
                        className={cn(
                            "p-2 rounded-md transition-colors duration-200 group relative flex items-center justify-center",
                            isActive
                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                        )}
                        title={item.name}
                    >
                        <Icon className="w-4 h-4" />
                        <span className="sr-only">{item.name}</span>

                        {/* Tooltip-like indicator on hover (optional enhancement) */}
                        <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-md border border-border">
                            {item.name}
                        </div>
                    </Link>
                )
            })}
        </aside >
    )
}

export default Sidebar