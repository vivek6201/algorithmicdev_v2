'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Briefcase, FileText, FolderOpen, LucideIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export const PRIMARY_NAV_ITEMS = [
    { href: '/jobs', icon: Briefcase, label: 'Jobs', id: 'jobs' },
    { href: '/blogs', icon: FileText, label: 'Blogs', id: 'blogs' },
];

import { useSidebarStore } from '@/store/sidebar';

export default function Sidebar() {
    const { activeTab, isSidebarOpen, secondaryNavItems } = useSidebarStore();

    return (
        <>
            {/* 1. FIXED PRIMARY SIDEBAR (Desktop) */}
            <aside className="hidden md:flex w-[70px] shrink-0 flex-col items-center py-4 bg-sidebar border-r border-sidebar-border z-30">
                <div className="mb-8">
                    <Link href="/" className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-primary-foreground text-xl shadow-lg shadow-primary/20">
                        A
                    </Link>
                </div>

                <nav className="flex flex-col gap-4 w-full items-center">
                    {PRIMARY_NAV_ITEMS.map((item) => (
                        <PrimaryNavItem
                            key={item.href}
                            href={item.href}
                            icon={item.icon}
                            label={item.label}
                            isActive={activeTab === item.id}
                        />
                    ))}
                </nav>
            </aside>

            {/* 2. COLLAPSIBLE SECONDARY SIDEBAR (Desktop) */}
            <motion.aside
                initial={{ width: 240 }}
                animate={{ width: isSidebarOpen ? 240 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="hidden md:block shrink-0 overflow-hidden bg-sidebar border-r border-sidebar-border relative z-20 group"
            >
                <div className="w-[240px] h-full flex flex-col overflow-hidden">

                    {/* Context Header */}
                    <div className="h-16 flex items-center px-6 border-b border-sidebar-border/50 shrink-0">
                        <span className="font-bold text-lg text-sidebar-foreground capitalize tracking-tight truncate">
                            {activeTab}
                        </span>
                    </div>

                    {/* Scrollable Nav Items */}
                    <ScrollArea className="flex-1">
                        <div className="p-4 flex flex-col gap-6">
                            {secondaryNavItems.length > 0 ? (
                                secondaryNavItems.map((section, idx) => (
                                    <div key={idx}>
                                        <div className="flex items-center justify-between px-2 mb-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                                            <div className="flex items-center gap-2">
                                                {section.title}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            {section.items.map((item, i) => (
                                                <Link
                                                    key={i}
                                                    href={item.href}
                                                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-sidebar-foreground/70 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all"
                                                >
                                                    <FolderOpen size={16} className="opacity-70" />
                                                    {item.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                                    <p className="mb-2">No items available.</p>
                                    <p className="text-xs text-muted-foreground/80">This section has no specific navigation.</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </motion.aside>
        </>
    );
}

function PrimaryNavItem({ icon: Icon, label, isActive, href }: { icon: LucideIcon, label: string, isActive: boolean, href: string }) {
    return (
        <Link
            href={href}
            className={cn(
                "flex flex-col items-center gap-1 p-2 w-full transition-all duration-200 group relative",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
        >
            {isActive && (
                <motion.div
                    layoutId="active-nav"
                    className="absolute left-0 top-3 bottom-3 w-1 bg-primary rounded-r-full"
                />
            )}
            <div className={cn(
                "p-2.5 rounded-xl transition-all duration-300",
                isActive ? "bg-primary/10 shadow-sm" : "group-hover:bg-sidebar-accent"
            )}>
                <Icon size={20} />
            </div>
            <span className={cn("text-[10px] font-medium transition-colors", isActive ? "font-semibold" : "")}>
                {label}
            </span>
        </Link>
    );
}