"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/use-media-query"
import { LinkedInIcon, WhatsAppIcon, XIcon } from "@/components/ui/icon"

interface ShareDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    link: string
    title?: string
}

export function ShareDialog({ open, onOpenChange, link, title = "Share" }: ShareDialogProps) {
    const [copied, setCopied] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const shareText = 'Check out this!'

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(link)
            setCopied(true)
            toast.success("Link copied!")
            setTimeout(() => setCopied(false), 2000)
        } catch {
            toast.error("Failed to copy link")
        }
    }

    const handleWhatsAppShare = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + link)}`, '_blank')
    }

    const handleLinkedInShare = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`, '_blank')
    }

    const handleXShare = () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(link)}`, '_blank')
    }

    const ShareContent = () => (
        <>
            <div className="flex items-center gap-2">
                <div className="flex-1 rounded border bg-muted/30 px-2.5 py-2 font-mono text-xs break-all">
                    {link}
                </div>
                <Button
                    size="icon"
                    variant="outline"
                    onClick={handleCopyLink}
                    className="shrink-0 h-8 w-8"
                >
                    {copied ? (
                        <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                        <Copy className="h-3.5 w-3.5" />
                    )}
                </Button>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleWhatsAppShare} className="flex-1 h-9">
                    <WhatsAppIcon />
                    WhatsApp
                </Button>
                <Button variant="outline" size="sm" onClick={handleLinkedInShare} className="flex-1 h-9">
                    <LinkedInIcon />
                    LinkedIn
                </Button>
                <Button variant="outline" size="sm" onClick={handleXShare} className="flex-1 h-9">
                    <XIcon />
                    X
                </Button>
            </div>
        </>
    )

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-sm gap-3 p-4">
                    <DialogHeader className="pb-0 space-y-0">
                        <DialogTitle className="text-sm font-medium">{title}</DialogTitle>
                    </DialogHeader>
                    <ShareContent />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle className="text-sm font-medium">{title}</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-4 space-y-3">
                    <ShareContent />
                </div>
            </DrawerContent>
        </Drawer>
    )
}
