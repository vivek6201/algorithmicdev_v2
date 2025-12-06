'use client';

import Link from 'next/link';
import { Bell, Menu, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSidebarStore } from '@/store/sidebar';
import { NavSection } from '@/store/sidebar';

export default function Header() {
    const { activeTab, secondaryNavItems } = useSidebarStore();

    return (
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4">
                {/* Mobile Menu Trigger */}
                <SecondarySidebar activeTab={activeTab} secondaryNavItems={secondaryNavItems} />
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Bell size={20} />
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20">
                    Get Plus
                </Button>
            </div>
        </header>
    );
}

const SecondarySidebar = ({ activeTab, secondaryNavItems }: { activeTab: string; secondaryNavItems: NavSection[] }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground">
                    <Menu size={20} />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
                <div className="flex flex-col h-full">
                    <div className="h-16 flex items-center px-6 border-b border-border">
                        <span className="font-bold text-lg text-foreground capitalize tracking-tight">
                            {activeTab}
                        </span>
                    </div>
                    <ScrollArea className="flex-1">
                        <div className="p-4 flex flex-col gap-6">
                            {secondaryNavItems.length > 0 ? (
                                secondaryNavItems.map((section, idx) => (
                                    <div key={idx}>
                                        <div className="flex items-center justify-between px-2 mb-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                                            {section.title}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            {section.items.map((item, i) => (
                                                <Link
                                                    key={i}
                                                    href={item.href}
                                                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground rounded-lg hover:bg-sidebar-accent hover:text-foreground transition-all"
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
                                    <p>No items available.</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </SheetContent>
        </Sheet>
    )
}

