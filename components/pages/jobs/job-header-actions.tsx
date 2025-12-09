"use client";

import { Button } from "@/components/ui/button";
import { Bookmark, MessageCircle, Linkedin, ExternalLink, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface JobHeaderActionsProps {
    applyUrl: string;
}

export default function JobHeaderActions({ applyUrl }: JobHeaderActionsProps) {
    const handleWhatsappShare = () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://wa.me/?text=${url}`, '_blank');
    }

    const handleLinkedinShare = () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }

    const handleBookmark = () => {
        console.log('Bookmark');
    }

    return (
        <>
            {/* Desktop View */}
            <div className="hidden lg:flex flex-col lg:self-start lg:gap-3">
                <Button className="rounded-full px-6 font-semibold" size="lg" asChild>
                    <Link href={applyUrl} target="_blank" rel="noopener noreferrer">
                        Apply Now
                        <ExternalLink className="ml-2 w-4 h-4" />
                    </Link>
                </Button>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="cursor-pointer rounded-full w-8 h-8 border-foreground/20 hover:bg-muted text-green-600 hover:text-green-700" onClick={handleWhatsappShare}>
                        <MessageCircle className="w-4 h-4 fill-current" />
                    </Button>
                    <Button variant="outline" size="icon" className="cursor-pointer rounded-full w-8 h-8 border-foreground/20 hover:bg-muted text-blue-600 hover:text-blue-700" onClick={handleLinkedinShare}>
                        <Linkedin className="w-4 h-4 fill-current" />
                    </Button>
                    <Button variant="outline" size="icon" className="cursor-pointer rounded-full w-8 h-8 border-foreground/20 hover:bg-muted" onClick={handleBookmark}>
                        <Bookmark className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Mobile View - Actions Dropdown in Header */}
            <div className="lg:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-full">
                            <MoreHorizontal className="w-5 h-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleWhatsappShare}>
                            <MessageCircle className="mr-2 w-4 h-4" />
                            <span>WhatsApp</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLinkedinShare}>
                            <Linkedin className="mr-2 w-4 h-4" />
                            <span>LinkedIn</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleBookmark}>
                            <Bookmark className="mr-2 w-4 h-4" />
                            <span>Save Job</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Mobile View - Floating Apply Button */}
            <div className="fixed bottom-15 left-0 right-0 p-4 z-50 md:hidden pb-safe">
                <Button className="w-full rounded-full font-semibold shadow-lg" size="lg" asChild>
                    <Link href={applyUrl} target="_blank" rel="noopener noreferrer">
                        Apply Now
                        <ExternalLink className="ml-2 w-4 h-4" />
                    </Link>
                </Button>
            </div>
        </>
    );
}
