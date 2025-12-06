'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-transparent border-t border-gray-200 dark:border-white/10">
            <div className="max-w-[1400px] w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 py-12">
                {/* Logo + Tagline */}
                <div className="space-y-4">
                    <Link href="/" className="font-bold text-lg sm:text-xl text-gray-800 dark:text-white flex items-center gap-2 group">
                        AlgorithmicDev
                    </Link>
                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-sm">
                        Your complete tech career platform. Find jobs, build community, share knowledge, and
                        learn new skills.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-6 text-sm">
                    <div className="space-y-2 flex flex-col gap-y-2">
                        <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            About
                        </Link>
                    </div>
                    <div className="space-y-2 flex flex-col gap-y-2">
                        <Link href="/tnc" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            Terms of Services
                        </Link>
                        <Link href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            Privacy Policy
                        </Link>
                    </div>
                </div>

                {/* Social Links */}
                <div className="space-y-4 flex flex-col md:items-end">
                    <h4 className="font-semibold text-gray-800 dark:text-white text-base">Follow Us</h4>
                    <div className="flex gap-5 items-center md:justify-end">
                        <a href="https://x.com/_Vivek_930" target="_blank" rel="noopener noreferrer" className="group">
                            <Twitter className="text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors w-5 h-5 md:w-6 md:h-6" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/vivek-kumar-gupta-/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                        >
                            <Linkedin className="text-gray-500 group-hover:text-[#0077b5] transition-colors w-5 h-5 md:w-6 md:h-6" />
                        </a>
                        <a href="https://github.com/vivek6201" target="_blank" rel="noopener noreferrer" className="group">
                            <Github className="text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors w-5 h-5 md:w-6 md:h-6" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="py-8 border-t border-gray-100 dark:border-white/5 text-center text-sm text-gray-400 max-w-[1400px] w-11/12 mx-auto">
                &copy; {new Date().getFullYear()} AlgorithmicDev. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;