'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Mail, Sparkles, Terminal, Code2, Rocket, Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'nextjs-toploader/app';
import ContainerTextFlip from '@/components/ui/text-flip';

const categories = [
    { name: 'Tutorials', icon: <Code2 className="w-4 h-4" />, href: '/tutorials' },
    { name: 'Find Jobs', icon: <Search className="w-4 h-4" />, href: '/jobs' },
    { name: 'Read Blogs', icon: <Terminal className="w-4 h-4" />, href: '/blogs' },
    { name: 'Hire Talent', icon: <Rocket className="w-4 h-4" />, href: '/jobs/hire' },
];

const skills = ['React', 'Python', 'Machine Learning', 'Data Science', 'Node.js', 'Flutter'];

export default function HeroSection() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const words = ['Building', 'Learning', 'Applying'];

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setTimeout(() => setIsSubscribed(true), 500);
    };

    return (
        <section className="relative w-full px-4 py-40 overflow-hidden border-b border-zinc-100 dark:border-zinc-800">
            {/* 1. Base Grid */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px]"></div>

            {/* 2. Top Center Blue Glow (Main Light) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

            {/* 3. Bottom Right Purple Glow (Fills right side void) */}
            <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[800px] h-[800px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            {/* 4. Middle Left Cyan Glow (Fills left side void) */}
            <div className="absolute top-1/2 left-0 -translate-x-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="relative z-10 container md:px-10 mx-auto flex flex-col xl:flex-row items-center justify-between gap-12 lg:gap-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="w-full xl:w-1/2 flex flex-col items-center xl:items-start text-center xl:text-left space-y-6"
                >
                    {/* Top Badge */}
                    <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50/50 dark:bg-blue-900/20 dark:border-blue-800 p-1 pr-3 backdrop-blur-sm">
                        <Badge variant="secondary" className="h-6 px-2 mr-2 bg-white dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 shadow-sm rounded-full">
                            New
                        </Badge>
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-300 flex items-center gap-1">
                            #1 Platform for Tech Careers <Sparkles className="w-3 h-3" />
                        </span>
                    </div>

                    {/* Headline */}
                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                            Master <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Code</span> <br />
                            Launch your <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-500">Career</span>
                        </h1>

                        <div className="text-lg sm:text-xl text-muted-foreground flex flex-wrap items-center justify-center lg:justify-start gap-2 h-8">
                            <span>Become Job-Ready by</span>
                            <ContainerTextFlip
                                words={words}
                                className="font-semibold text-foreground"
                            />
                        </div>
                    </div>

                    <p className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed">
                        Don't just watch tutorials. Build real projects, land high-paying jobs, and join a community of builders.
                    </p>

                    {/* --- THE HOOK: Integrated Input Field --- */}
                    <div className="w-full max-w-md">
                        <AnimatePresence mode='wait'>
                            {!isSubscribed ? (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onSubmit={handleSubscribe}
                                    className="relative group"
                                >
                                    <div className="relative flex items-center p-1.5 bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-lg shadow-zinc-200/50 dark:shadow-none focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                                        <Mail className="ml-3 w-5 h-5 text-muted-foreground" />
                                        <Input
                                            type="email"
                                            placeholder="Subscribe to our email box"
                                            className="border-none shadow-none focus-visible:ring-0 bg-white dark:bg-zinc-900/80 h-10 px-3 text-sm sm:text-base"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <Button size="sm" className="rounded-full h-10 px-6 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md transition-all">
                                            Join Now
                                        </Button>
                                    </div>
                                    <div className="mt-3 flex items-center justify-center lg:justify-start gap-3 px-2">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-background bg-zinc-200 overflow-hidden">
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 12}`} alt="user" className="w-full h-full" />
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-xs text-muted-foreground">Join <strong className="text-foreground">2,000+</strong> developers</span>
                                    </div>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900 rounded-xl"
                                >
                                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                                        <CheckCircle2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-green-800 dark:text-green-300">Welcome aboard!</p>
                                        <p className="text-xs text-green-600 dark:text-green-400">Check your inbox for the starter kit.</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
                        {categories.map(({ name, icon, href }) => (
                            <Button
                                key={name}
                                variant="outline"
                                className="h-9 px-4 text-xs sm:text-sm gap-2 rounded-full border-zinc-200 dark:border-zinc-800 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm"
                                onClick={() => router.push(href)}
                            >
                                {icon}
                                {name}
                            </Button>
                        ))}
                    </div>
                </motion.div>

                {/* RIGHT: Dynamic Visual Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="hidden xl:block w-[420px] relative perspective-1000 group"
                >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-linear-to-tr from-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

                    {/* Card Container - Rotates slightly on default, straightens on hover */}
                    <div className="relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-700/50 shadow-2xl rounded-2xl p-6 transform transition-transform duration-500 group-hover:scale-[1.02] -rotate-2 group-hover:rotate-0 origin-bottom-right">

                        {/* Card Header */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                                    <Code2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold">Full Stack Path</h3>
                                    <p className="text-[11px] text-muted-foreground">Track: Advanced React</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-[10px] px-2">In Progress</Badge>
                            </div>
                        </div>

                        {/* Progress Visual */}
                        <div className="mb-6 space-y-2">
                            <div className="flex justify-between text-xs font-medium">
                                <span>Course Completion</span>
                                <span>78%</span>
                            </div>
                            <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-linear-to-r from-blue-500 to-purple-500 rounded-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '78%' }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                />
                            </div>
                        </div>

                        {/* Skills Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            {skills.slice(0, 4).map((skill, index) => (
                                <div key={skill} className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-700/50 hover:border-blue-200 transition-colors">
                                    <div className={`w-2 h-2 rounded-full ${index % 2 === 0 ? 'bg-blue-500' : 'bg-purple-500'}`} />
                                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{skill}</span>
                                </div>
                            ))}
                        </div>

                        {/* Floating "Action" Toast */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="absolute -right-4 -bottom-4 bg-zinc-900 dark:bg-black text-white p-3 rounded-lg shadow-xl flex items-center gap-3 text-xs border border-zinc-800"
                        >
                            <Terminal className="w-4 h-4 text-green-400" />
                            <span><span className="text-green-400">✔</span> Deploying to production...</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}