'use client';

import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import {
    Briefcase,
    Users,
    BookOpen,
    FileText,
    ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
    {
        title: "Find Jobs",
        subtitle: "For Job Seekers",
        description: "Algorithmic matching connects you with roles that fit your exact stack and salary expectations.",
        icon: <Briefcase className="w-6 h-6 text-white" />,
        gradient: "from-blue-500 to-cyan-500",
        shadow: "group-hover:shadow-blue-500/20",
        href: "/jobs",
        delay: 0.1
    },
    {
        title: "Hire Talent",
        subtitle: "For Employers",
        description: "Skip the noise. Access a pre-vetted pool of top-tier developers ready to ship code from day one.",
        icon: <Users className="w-6 h-6 text-white" />,
        gradient: "from-purple-500 to-pink-500",
        shadow: "group-hover:shadow-purple-500/20",
        href: "/hire",
        delay: 0.2
    },
    {
        title: "Learn & Grow",
        subtitle: "Education",
        description: "Stay ahead of the curve with deep-dive technical blogs, interactive tutorials, and roadmaps.",
        icon: <BookOpen className="w-6 h-6 text-white" />,
        gradient: "from-amber-500 to-orange-500",
        shadow: "group-hover:shadow-amber-500/20",
        href: "/tutorials",
        delay: 0.3
    },
    {
        title: "CV Builder",
        subtitle: "Tools",
        description: "Our AI analyzes job descriptions to help you craft the perfect, ATS-proof resume in seconds.",
        icon: <FileText className="w-6 h-6 text-white" />,
        gradient: "from-green-500 to-emerald-500",
        shadow: "group-hover:shadow-green-500/20",
        href: "/cv-builder",
        delay: 0.4
    }
];

export default function FeaturesSection() {
    return (
        <section id="features" className="relative py-24 sm:py-32 overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative max-w-[1400px] mx-auto px-6">

                {/* Header */}
                <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-1.5 pr-4 mb-6 backdrop-blur-sm">
                            <span className="flex h-6 px-3 items-center justify-center rounded-full bg-zinc-900 dark:bg-white text-xs font-bold text-white dark:text-black mr-2">
                                Features
                            </span>
                            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                                Everything you need to succeed
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
                            Build your career. <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                                Without the limits.
                            </span>
                        </h2>
                        <p className="text-base sm:text-lg text-muted-foreground leading-8">
                            Whether you are looking to find your next role, hire the perfect candidate, or simply learn something new, we have built the tools to help you do it better.
                        </p>
                    </motion.div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: feature.delay, duration: 0.5 }}
                            className="group relative h-full"
                        >
                            <div className={cn(
                                "relative h-full overflow-hidden rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-8 transition-all duration-300 hover:border-transparent",
                                "hover:shadow-2xl",
                                feature.shadow
                            )}>

                                {/* Gradient Border Overlay on Hover */}
                                <div className={cn(
                                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-linear-to-br p-px -z-10",
                                    feature.gradient
                                )} style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }} />

                                {/* Content */}
                                <div className="flex flex-col h-full">
                                    <div className="flex items-start justify-between mb-8">
                                        <div className={cn(
                                            "w-12 h-12 rounded-2xl flex items-center justify-center bg-linear-to-br shadow-lg",
                                            feature.gradient
                                        )}>
                                            {feature.icon}
                                        </div>
                                        <Badge variant="secondary" className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                                            {feature.subtitle}
                                        </Badge>
                                    </div>

                                    <div className="mt-auto">
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                                            {feature.description}
                                        </p>

                                        <div className="flex items-center text-sm font-semibold text-zinc-900 dark:text-white group/link cursor-pointer">
                                            Learn more
                                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                                        </div>
                                    </div>
                                </div>

                                {/* Subtle Background Blob */}
                                <div className={cn(
                                    "absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-500",
                                    feature.gradient.replace('from-', 'bg-').split(' ')[0] // Hack to get primary color
                                )} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}