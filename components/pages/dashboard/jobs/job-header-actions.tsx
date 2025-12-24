"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Share2 } from "lucide-react";
import Link from "next/link";
import { ShareDialog } from "@/components/common/share-dialog";
import { useState } from "react";

interface JobHeaderActionsProps {
    applyUrl: string;
}

export default function JobHeaderActions({ applyUrl }: JobHeaderActionsProps) {
    const [open, setOpen] = useState(false)
    return (
        <>
            {/* Desktop View */}
            <div className="hidden lg:flex lg:justify-end lg:gap-3">
                <Button className="rounded-full px-6 font-semibold" size="lg" asChild>
                    <Link href={applyUrl} target="_blank" rel="noopener noreferrer">
                        Apply Now
                        <ExternalLink className="ml-2 w-4 h-4" />
                    </Link>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setOpen(true)}
                >
                    <Share2 className="w-4 h-4" />
                </Button>
                <ShareDialog link={applyUrl} open={open} onOpenChange={setOpen} title="Share Job" />
            </div>

            {/* Mobile View - Floating Apply Button */}
            <div className="fixed bottom-15 left-0 right-0 p-4 z-50 md:hidden pb-safe">
                <div className="flex gap-2">
                    <Button className="flex-1 rounded-full font-semibold shadow-lg" size="lg" asChild>
                        <Link href={applyUrl} target="_blank" rel="noopener noreferrer">
                            Apply Now
                            <ExternalLink className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full shadow-lg"
                        onClick={() => setOpen(true)}
                    >
                        <Share2 className="w-4 h-4" />
                    </Button>
                </div>
                <ShareDialog link={applyUrl} open={open} onOpenChange={setOpen} title="Share Job" />
            </div>
        </>
    );
}
