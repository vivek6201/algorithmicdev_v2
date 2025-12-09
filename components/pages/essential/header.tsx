'use client';

import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import ThemeToggler from '@/components/common/theme-toggler';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#features' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Jobs', href: '/jobs' }
];

export default function Header() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Detect scroll to change background style
    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        // Only handle hash links on the current page
        if (href.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2, type: "spring", bounce: 0.35 }}

                className={cn(
                    "fixed top-2 inset-x-0 mx-auto z-50 w-[95%] container rounded-full transition-all duration-300 border",
                    scrolled
                        ? "backdrop-blur-xl border-zinc-200 dark:border-zinc-800 shadow/60 py-2 px-3"
                        : "backdrop-blur-sm border-transparent py-3 px-4"
                )}
            >
                <div className="flex items-center justify-between h-10 px-2">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="font-bold text-lg sm:text-xl tracking-tight text-foreground">
                            AlgorithmicDev
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Button
                                key={item.name}
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 rounded-full px-4 h-9"
                                asChild
                            >
                                <Link
                                    href={item.href}
                                    onClick={(e) => handleScroll(e, item.href)}
                                >
                                    {item.name}
                                </Link>
                            </Button>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <ThemeToggler />
                        <Link href="/login" className="hidden lg:block">
                            <Button size="sm" className="rounded-full h-9 px-5">
                                Get Started
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden rounded-full"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </Button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="fixed top-24 inset-x-4 z-40 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl lg:hidden max-w-3xl mx-auto"
                    >
                        <nav className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="px-4 py-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-medium transition-colors"
                                    onClick={(e) => {
                                        setMobileMenuOpen(false);
                                        handleScroll(e, item.href);
                                    }}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link href="/login">
                                <Button className="w-full rounded-xl">Get Started</Button>
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}