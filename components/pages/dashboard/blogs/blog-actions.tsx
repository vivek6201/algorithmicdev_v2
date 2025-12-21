"use client"

import { useTransition, useOptimistic, useEffect, useState } from "react"
import { ThumbsUp, ThumbsDown, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { fetchBlogMetadata, performReaction } from "@/lib/routes/blogs"
import { BlogMetadata } from "@/types/blog"

interface BlogActionsProps {
    blogSlug: string
}

type OptimisticAction = 'like' | 'dislike' | 'bookmark'

const DEFAULT_METADATA: BlogMetadata = {
    likes: 0,
    dislikes: 0,
    user_action: null
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
                dislikes: state.user_action === 'dislike' ? Math.max(0, state.dislikes - 1) : state.dislikes,
                user_action: 'like'
            }
        case 'dislike':
            return {
                likes: state.user_action === 'like' ? Math.max(0, state.likes - 1) : state.likes,
                dislikes: state.dislikes + 1,
                user_action: 'dislike'
            }
        case "bookmark":
            return {
                ...state,
                user_action: 'bookmark'
            }
        default:
            return state
    }
}

export default function BlogActions({ blogSlug }: BlogActionsProps) {
    const [metadata, setMetadata] = useState<BlogMetadata | null>(null)
    const [isPending, startTransition] = useTransition()
    const [isLoaded, setIsLoaded] = useState(false)

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

    const handleLike = () => {
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

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            toast.success("Link copied!")
        } catch {
            toast.error("Failed to copy link")
        }
    }

    const displayMetadata = optimisticMetadata ?? DEFAULT_METADATA

    return (
        <div className="flex items-center gap-1.5">
            <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                disabled={isPending || !isLoaded}
                className={cn(
                    "h-8 px-2.5 gap-1.5 text-muted-foreground hover:text-foreground",
                    displayMetadata.user_action === 'like' && "text-primary hover:text-primary"
                )}
            >
                <ThumbsUp className={cn(
                    "h-4 w-4",
                    displayMetadata.user_action === 'like' && "fill-current"
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
                    displayMetadata.user_action === 'dislike' && "text-destructive hover:text-destructive"
                )}
            >
                <ThumbsDown className={cn(
                    "h-4 w-4",
                    displayMetadata.user_action === 'dislike' && "fill-current"
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
    )
}
