"use client"

import { useTransition, useOptimistic, useEffect, useState } from "react"
import { ThumbsUp, ThumbsDown, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { fetchBlogMetadata, performReaction } from "@/lib/routes/blogs"
import { BlogMetadata } from "@/types/blog"
import { useUserStore } from "@/store/user"
import { usePathname } from "next/navigation"
import { useRouter } from "nextjs-toploader/app"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ShareDialog } from "@/components/common/share-dialog"

interface BlogActionsProps {
    blogSlug: string
}

type OptimisticAction = 'like' | 'dislike'

const DEFAULT_METADATA: BlogMetadata = {
    likes: 0,
    dislikes: 0,
    current_reaction: null
}

function computeOptimisticState(
    current: BlogMetadata | null,
    action: OptimisticAction
): BlogMetadata {
    const state = current ?? DEFAULT_METADATA

    switch (action) {
        case 'like':
            return {
                likes: state.likes + 1,
                dislikes: state.current_reaction === 'DISLIKE' ? Math.max(0, state.dislikes - 1) : state.dislikes,
                current_reaction: 'LIKE'
            }
        case 'dislike':
            return {
                likes: state.current_reaction === 'LIKE' ? Math.max(0, state.likes - 1) : state.likes,
                dislikes: state.dislikes + 1,
                current_reaction: 'DISLIKE'
            }

        default:
            return state
    }
}

export default function BlogActions({ blogSlug }: BlogActionsProps) {
    const [metadata, setMetadata] = useState<BlogMetadata | null>(null)
    const [isPending, startTransition] = useTransition()
    const [isLoaded, setIsLoaded] = useState(false)
    const [showLoginDialog, setShowLoginDialog] = useState(false)
    const [showShareDialog, setShowShareDialog] = useState(false)

    const { isAuthenticated } = useUserStore()
    const pathname = usePathname()
    const router = useRouter()

    const [optimisticMetadata, addOptimisticUpdate] = useOptimistic(
        metadata,
        computeOptimisticState
    )

    useEffect(() => {
        let isMounted = true

        fetchBlogMetadata(blogSlug)
            .then((data) => {
                if (isMounted) {
                    setMetadata(data ?? DEFAULT_METADATA)
                    setIsLoaded(true)
                }
            })
            .catch(() => {
                if (isMounted) {
                    setMetadata(DEFAULT_METADATA)
                    setIsLoaded(true)
                }
            })

        return () => {
            isMounted = false
        }
    }, [blogSlug])

    const handleLoginRedirect = () => {
        const redirectUrl = `/login?redirect=${encodeURIComponent(pathname)}`
        router.push(redirectUrl)
    }

    const handleLike = () => {
        if (!isAuthenticated) {
            setShowLoginDialog(true)
            return
        }

        startTransition(async () => {
            addOptimisticUpdate('like')
            try {
                const result = await performReaction(blogSlug, 'like')
                setMetadata(result ?? DEFAULT_METADATA)
            } catch {
                toast.error("Failed to update. Please try again.")
            }
        })
    }

    const handleDislike = () => {
        if (!isAuthenticated) {
            setShowLoginDialog(true)
            return
        }

        startTransition(async () => {
            addOptimisticUpdate('dislike')
            try {
                const result = await performReaction(blogSlug, 'dislike')
                setMetadata(result ?? DEFAULT_METADATA)
            } catch {
                toast.error("Failed to update. Please try again.")
            }
        })
    }

    const handleShare = () => {
        setShowShareDialog(true)
    }

    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

    const displayMetadata = optimisticMetadata ?? DEFAULT_METADATA

    return (
        <>
            <div className="flex items-center gap-1.5">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    disabled={isPending || !isLoaded}
                    className={cn(
                        "h-8 px-2.5 gap-1.5 text-muted-foreground hover:text-foreground",
                        displayMetadata.current_reaction === 'LIKE' && "text-primary hover:text-primary"
                    )}
                >
                    <ThumbsUp className={cn(
                        "h-4 w-4",
                        displayMetadata.current_reaction === 'LIKE' && "fill-current"
                    )} />
                    {displayMetadata.likes > 0 && (
                        <span className="text-sm font-medium">{displayMetadata.likes}</span>
                    )}
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDislike}
                    disabled={isPending || !isLoaded}
                    className={cn(
                        "h-8 px-2.5 gap-1.5 text-muted-foreground hover:text-foreground",
                        displayMetadata.current_reaction === 'DISLIKE' && "text-destructive hover:text-destructive"
                    )}
                >
                    <ThumbsDown className={cn(
                        "h-4 w-4",
                        displayMetadata.current_reaction === 'DISLIKE' && "fill-current"
                    )} />
                    {displayMetadata.dislikes > 0 && (
                        <span className="text-sm font-medium">{displayMetadata.dislikes}</span>
                    )}
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="h-8 px-2.5 gap-1.5 text-muted-foreground hover:text-foreground"
                >
                    <Share2 className="h-4 w-4" />
                </Button>
            </div>

            <AlertDialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Login Required</AlertDialogTitle>
                        <AlertDialogDescription>
                            You need to be logged in to interact with this blog post. Would you like to login now?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLoginRedirect}>
                            Login
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <ShareDialog
                open={showShareDialog}
                onOpenChange={setShowShareDialog}
                link={shareUrl}
                title="Share this Blog"
            />
        </>
    )
}
