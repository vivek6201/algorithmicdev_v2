'use client';

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Sidebar, { PRIMARY_NAV_ITEMS } from '@/components/pages/dashboard/common/sidebar';
import Header from '@/components/pages/dashboard/common/header';

import { NavSection, useSidebarStore } from '@/store/sidebar';
import { Button } from '@/components/ui/button';

const EMPTY_NAV_ITEMS: NavSection[] = [];

interface DashboardLayoutProps {
    children: React.ReactNode;
    sidebarNavItems?: NavSection[];
    activeTab?: 'jobs' | 'blogs' | 'tutorials'
}

export default function DashboardLayout({
    children,
    sidebarNavItems = EMPTY_NAV_ITEMS,
    activeTab: propActiveTab
}: DashboardLayoutProps) {
    const pathname = usePathname();
    const { setSecondaryNavItems, setActiveTab, isSidebarOpen, setSidebarOpen, activeTab: storeActiveTab } = useSidebarStore();

    const activeTab = propActiveTab || PRIMARY_NAV_ITEMS.find(item => pathname.includes(item.href))?.id || '';

    useEffect(() => {
        if (sidebarNavItems !== EMPTY_NAV_ITEMS) {
            setSecondaryNavItems(sidebarNavItems);
        }
    }, [sidebarNavItems, setSecondaryNavItems]);

    useEffect(() => {
        if (activeTab) {
            setActiveTab(activeTab);
        }
    }, [activeTab, setActiveTab]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSidebarOpen(false);
        }, 5000);

        return () => clearTimeout(timeout);
    }, [setSidebarOpen]);

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden font-sans text-foreground">
            <Sidebar />

            {/* 3. MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col min-w-0 bg-background relative pb-16 md:pb-0">
                <div className="hidden md:block absolute top-6 left-0 z-50 transform -translate-x-1/2">
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:scale-110 transition-all shadow-sm"
                    >
                        {isSidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                    </Button>
                </div>

                <Header />

                <main className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth">
                    {children}
                </main>
            </div>

            {/* 4. BOTTOM NAVIGATION (Mobile) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border flex items-center justify-around z-50 px-2">
                {PRIMARY_NAV_ITEMS.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center justify-center w-full h-full gap-1",
                            storeActiveTab === item.id ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        <item.icon size={20} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}