"use client"

import { jobSidebarItems } from "@/lib/utils/constants"
import { SidebarItemType } from "../sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function JobSidebar() {
    const pathname = usePathname()

    return (
        <div className="flex flex-col h-full bg-card border-r border-border p-4 gap-4">
            <nav className="flex gap-y-1 flex-col space-y-1">
                {jobSidebarItems.filter((item) => item.isActive === true).map((item) => (
                    <SidebarItem
                        key={item.name}
                        item={item}
                        isActive={pathname === item.link || pathname.startsWith(`${item.link}/`)}
                    />
                ))}
            </nav>
        </div>
    )
}

function SidebarItem({ item, isActive }: { item: SidebarItemType, isActive: boolean }) {
    const Icon = item.icon
    return (
        <Link
            href={item.link}
            className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
        >
            <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-muted-foreground")} />
            <span>{item.name}</span>
        </Link>
    )
}