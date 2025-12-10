"use client"

import ThemeToggler from "@/components/common/theme-toggler"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/auth"
import { useUserStore } from "@/store/user"
import Link from "next/link"

export default function Header() {
    const { isAuthenticated, user } = useUserStore()
    const { logout } = useAuth()

    return (
        <div className="h-16 flex items-center justify-between p-4  border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
            <Link href="/" className="flex items-center gap-2 group mr-4">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-foreground">
                    AlgorithmicDev
                </span>
            </Link>
            <div className="flex gap-2 items-center">
                <ThemeToggler />
                {
                    isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="h-9 w-9 cursor-pointer">
                                    <AvatarFallback className='text-sm'>
                                        {(user?.name || user?.email || 'U')
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')
                                            .toUpperCase()
                                        }
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild className='hover:rounded-none'>
                                    <Link href="/profile">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={logout} className='hover:rounded-none'>Log out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/login">
                            <Button size="sm" className="rounded-full h-9 px-5">
                                Get Started
                            </Button>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}
