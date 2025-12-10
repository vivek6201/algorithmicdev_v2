"use client"

import { sidebarItems } from "@/lib/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function MobileNav() {
    const pathname = usePathname()

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-background px-4 md:hidden">
            {sidebarItems.map((item) => {
                const isActive = item.link === "/"
                    ? pathname === "/"
                    : pathname === item.link || pathname.startsWith(`${item.link}/`)
                const Icon = item.icon

                return (
                    <Link
                        key={item.link}
                        href={item.link}
                        className={cn(
                            "flex flex-col items-center justify-center gap-1 rounded-md p-2 transition-colors",
                            isActive
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
                        <span className="text-[10px] font-medium">{item.name}</span>
                    </Link>
                )
            })}
        </div>
    )
}
