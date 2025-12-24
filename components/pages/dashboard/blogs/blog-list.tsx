"use client"

import { fetchBlogs } from "@/lib/routes/blogs"
import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query"

import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useDebounce } from "@/hooks/use-debounce"
import { lazyLoadClient } from "@/lib/lazy"
import { Blog } from "@/types/blog"
import useInView from "@/hooks/use-in-view"

const BlogCard = lazyLoadClient<{ blog: Blog }>(() => import("./blog-card").then(mod => ({ default: mod.default })))

export default function BlogList() {
    const { ref, inView } = useInView()
    const [searchQuery, setSearchQuery] = useState("")
    const debouncedSearch = useDebounce(searchQuery, 300)

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isFetching,
        error
    } = useInfiniteQuery({
        queryKey: ["blogs", debouncedSearch],
        queryFn: async ({ pageParam = 1 }) => {
            return fetchBlogs({ page: pageParam, limit: 10, search: debouncedSearch })
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage) return undefined
            return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined
        },
        placeholderData: keepPreviousData
    })

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

    // Only show skeleton on initial load, not when searching
    if (isLoading && !data) {
        return <BlogSkeleton />
    }

    // Show error state when API fails
    if (error && !data) {
        return (
            <div className="flex flex-col gap-6 w-full mx-auto">
                <div className="flex flex-col mb-5 md:mb-0">
                    <h1 className="text-xl lg:text-2xl font-bold tracking-tight">Explore Blogs</h1>
                    <p className="text-sm md:text-base text-muted-foreground">Discover insights and tutorials from our curated collection.</p>
                </div>
                <div className="p-8 text-center text-red-500 bg-red-500/10 rounded-lg border border-red-500/20">
                    Failed to load blogs. Please try again later.
                </div>
            </div>
        )
    }

    if (!data) {
        return null
    }

    const { pages } = data
    const blogs = pages.flatMap(page => page?.data ?? [])

    return (
        <div className="flex flex-col gap-6 w-full mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
                <div className="flex flex-col mb-5 md:mb-0">
                    <h1 className="text-xl lg:text-2xl font-bold tracking-tight">Explore Blogs</h1>
                    <p className="text-sm md:text-base text-muted-foreground">Discover insights and tutorials from our curated collection.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[300px] lg:w-[500px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search blogs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-background pl-9 pr-9 focus:bg-background transition-all"
                        />
                        {isFetching && searchQuery && (
                            <Loader2 className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground animate-spin" />
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5 w-full">
                {error && (
                    <div className="p-8 text-center text-red-500 bg-red-500/10 rounded-lg border border-red-500/20">
                        Failed to load blogs. Please try again later.
                    </div>
                )}

                {!isLoading && blogs.length === 0 && (
                    <div className="p-12 text-center text-muted-foreground bg-muted/20 rounded-lg border border-border border-dashed h-64 flex items-center justify-center flex-col gap-2">
                        <p className="font-medium text-lg">No blogs found</p>
                        <p className="text-sm">Check back later for new content.</p>
                    </div>
                )}

                {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}

                {/* Loading spinner for next page */}
                {isFetchingNextPage && (
                    <div className="p-4 flex justify-center w-full">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                )}

                {/* Intersection observer target */}
                <div ref={ref} className="h-4 w-full" />
            </div>
        </div>
    )
}

const BlogSkeleton = () => {
    return (
        <div className="flex flex-col gap-6 w-full mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight">Explore Blogs</h1>
                    <p className="text-muted-foreground">Discover insights and tutorials from our curated collection.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[300px]">
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="relative overflow-hidden rounded-2xl border border-border/50 bg-card">
                        <div className="flex flex-col sm:flex-row">
                            {/* Thumbnail skeleton */}
                            <Skeleton className="w-full sm:w-64 lg:w-72 h-52 sm:h-auto shrink-0 rounded-none" />

                            {/* Content skeleton */}
                            <div className="flex flex-col flex-1 p-5 sm:p-6 relative">
                                {/* Arrow indicator skeleton */}
                                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                                    <Skeleton className="w-10 h-10 rounded-full" />
                                </div>

                                {/* Meta badges skeleton */}
                                <div className="flex items-center gap-2 mb-3">
                                    <Skeleton className="h-5 w-24 rounded-full" />
                                    <Skeleton className="h-5 w-20 rounded-full" />
                                </div>

                                {/* Title skeleton */}
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-6 w-1/2 mb-2" />

                                {/* Description skeleton */}
                                <Skeleton className="h-4 w-full mb-1" />
                                <Skeleton className="h-4 w-4/5 mb-1" />
                                <Skeleton className="h-4 w-2/3 flex-1" />

                                {/* Bottom accent line skeleton */}
                                <div className="mt-4 pt-4 border-t border-border/50">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-5 w-24" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
