'use client';

import { MessageCircle, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
    {
        question: "Is the platform free for developers?",
        answer: "Yes! Creating a profile, browsing jobs, and accessing our basic tutorials is completely free. We also offer a Pro plan for access to advanced courses and priority job applications."
    },
    {
        question: "How does the vetting process work?",
        answer: "To ensure high quality, developers pass a series of automated coding challenges and a soft-skills video interview. Once verified, you get a 'Vetted' badge that boosts your visibility by 3x."
    },
    {
        question: "Can I post a job for free?",
        answer: "We offer a free trial for your first job posting. After that, we have flexible pricing tiers starting at $99/month for unlimited posts and access to our candidate database."
    },
    {
        question: "Are the tutorials suitable for beginners?",
        answer: "Absolutely. We have learning paths ranging from 'Zero to Hero' for beginners to 'System Design Mastery' for senior engineers looking to level up."
    },
    {
        question: "How do I get my CV reviewed?",
        answer: "Our AI CV Builder gives instant feedback. For Pro members, we offer manual reviews by industry experts from top tech companies like Google and Meta."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and wire transfers for enterprise billing."
    }
];

// Reusable Support Box Component for responsive placement
const SupportBox = () => (
    <div className="p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm relative overflow-hidden group">
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-transparent dark:from-blue-900/10 opacity-50 pointer-events-none" />

        <h3 className="text-xl font-bold mb-2 relative z-10 text-zinc-900 dark:text-white">
            Can't find what you need?
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 relative z-10">
            Our team is available 24/7 to help you with any issues you might face.
        </p>

        <div className="flex flex-col gap-3 relative z-10">
            <Button className="w-full justify-start gap-3 shadow-sm" size="lg">
                <MessageCircle className="w-4 h-4" />
                Chat with Support
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800" size="lg">
                <Mail className="w-4 h-4" />
                Send an Email
            </Button>
        </div>
    </div>
);

export default function FaqSection() {
    return (
        <section id="faq" className="relative py-16 lg:py-24 overflow-hidden">

            {/* Background Gradients */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-blue-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-purple-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            {/* Main Container - Full Width up to 1400px */}
            <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">

                    {/* LEFT COLUMN: Header & Support (Sticky on Desktop) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-24 text-left space-y-8">
                        <div>
                            <Badge variant="outline" className="mb-4 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                                <Sparkles className="w-3 h-3 mr-2 fill-yellow-500 text-yellow-500" />
                                Support Center
                            </Badge>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-4 lg:mb-6 leading-tight tracking-tight">
                                Frequently Asked <br className="hidden lg:block" />
                                <span className="text-blue-600 dark:text-blue-400">Questions</span>
                            </h2>

                            <p className="text-muted-foreground text-base sm:text-lg max-w-md leading-relaxed">
                                Everything you need to know about the platform, billing, and our vetting process.
                            </p>
                        </div>

                        {/* Support Box - Visible ONLY on Large Screens */}
                        <div className="hidden lg:block">
                            <SupportBox />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Shadcn Accordion */}
                    <div className="lg:col-span-7 w-full">
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl px-4 sm:px-6 data-[state=open]:border-blue-200 dark:data-[state=open]:border-blue-900 data-[state=open]:shadow-md transition-all duration-200"
                                >
                                    <AccordionTrigger className="text-base sm:text-lg font-medium py-5 sm:py-6 hover:no-underline hover:text-blue-600 dark:hover:text-blue-400 text-left">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-6 leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>

                        {/* Support Box - Visible ONLY on Mobile/Tablet (After FAQs) */}
                        <div className="block lg:hidden mt-12">
                            <SupportBox />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}