"use client"

import { fetchAllTutorials } from "@/lib/routes/tutorials"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import useInView from "@/hooks/use-in-view"
import { Loader2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useDebounce } from "@/hooks/use-debounce"
import { Skeleton } from "@/components/ui/skeleton"
import { lazyLoadClient } from "@/lib/lazy"
import { Tutorial } from "@/types/education/tutorial"

const TutorialCard = lazyLoadClient<{ tutorial: Tutorial }>(() => import("./tutorial-card").then(mod => ({ default: mod.default })))

export default function TutorialList() {
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
    } = useSuspenseInfiniteQuery({
        queryKey: ['tutorials', debouncedSearch],
        queryFn: ({ pageParam }) => fetchAllTutorials(pageParam, 10, debouncedSearch),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage) return undefined
            return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined
        }
    })

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

    // Only show skeleton on initial load, not when searching
    if (isLoading && !data) {
        return <TutorialSkeleton />
    }

    if (error && !data) {
        return (
            <div className="flex flex-col gap-6 w-full mx-auto">
                <div className="flex flex-col mb-5 md:mb-0">
                    <h1 className="text-xl lg:text-2xl font-bold tracking-tight">Explore Tutorials</h1>
                    <p className="text-sm md:text-base text-muted-foreground">Master algorithms and data structures with our step-by-step guides.</p>
                </div>
                <div className="text-red-500 p-8 text-center bg-red-500/10 rounded-lg border border-red-500/20">
                    Failed to load tutorials. Please try again later.
                </div>
            </div>
        )
    }

    const tutorials = data?.pages.flatMap((page) => page?.data ?? []) ?? []

    return (
        <div className="flex flex-col gap-6 w-full mx-auto p-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
                <div className="flex flex-col mb-5 md:mb-0">
                    <h1 className="text-xl lg:text-2xl font-bold tracking-tight">Explore Tutorials</h1>
                    <p className="text-sm md:text-base text-muted-foreground">Master algorithms and data structures with our step-by-step guides.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[300px] lg:w-[500px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search tutorials..."
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {!isLoading && tutorials.length === 0 && (
                    <div className="col-span-full p-12 text-center text-muted-foreground bg-muted/20 rounded-lg border border-border border-dashed h-64 flex items-center justify-center flex-col gap-2">
                        <p className="font-medium text-lg">No tutorials found</p>
                        <p className="text-sm">Try adjusting your search terms or check back later.</p>
                    </div>
                )}

                {tutorials.map((tutorial) => (
                    <TutorialCard key={tutorial.id} tutorial={tutorial} />
                ))}

                {isFetchingNextPage && (
                    <div className="col-span-full flex justify-center p-4">
                        <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
                    </div>
                )}

                <div ref={ref} className="col-span-full h-4 w-full" />
            </div>
        </div>
    )
}

const TutorialSkeleton = () => {
    return (
        <div className="flex flex-col gap-6 w-full mx-auto p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight">Explore Tutorials</h1>
                    <p className="text-muted-foreground">Master algorithms and data structures with our step-by-step guides.</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[300px]">
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex flex-col gap-4">
                        <Skeleton className="h-[220px] w-full rounded-xl" />
                        <Skeleton className="h-6 w-3/4" />
                    </div>
                ))}
            </div>
        </div>
    )
}