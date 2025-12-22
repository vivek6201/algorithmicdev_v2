"use client"

import { fetchExternalJobs } from "@/lib/routes/jobs"
import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query"
import JobCard from "./job-card"
import Filter from "./Filter"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useDebounce } from "@/hooks/use-debounce"

export default function JobList({ fetchFor }: { fetchFor: "other" | "direct" }) {
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
        queryKey: [`${fetchFor}-jobs`, debouncedSearch],
        queryFn: async ({ pageParam = 1 }) => {
            if (fetchFor === "other") {
                return fetchExternalJobs({ page: pageParam, limit: 10, search: debouncedSearch })
            }
            // return fetchDirectJobs()
            return { data: [], total_items: 0, total_pages: 0, page: 1, limit: 10 }
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
        return <JobSkeleton />
    }

    if (!data) {
        return null
    }

    const { pages } = data
    const jobs = pages.flatMap(page => page?.data ?? [])

    return (
        <div className="flex flex-col gap-6 w-full mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
                <div className="flex flex-col mb-5 md:mb-0">
                    <h1 className="text-xl lg:text-2xl font-bold tracking-tight">Explore Jobs</h1>
                    <p className="text-sm md:text-base text-muted-foreground">Find your next opportunity from our curated list of positions.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[300px] lg:w-[500px]">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search jobs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-background pl-9 pr-9 focus:bg-background transition-all"
                        />
                        {isFetching && searchQuery && (
                            <Loader2 className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground animate-spin" />
                        )}
                    </div>
                    {/* Mobile Filter Trigger Position */}
                    <div className="lg:hidden">
                        <Filter />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                <div className="flex flex-col gap-5 w-full lg:col-span-3 order-2 lg:order-1">
                    {error && (
                        <div className="p-8 text-center text-red-500 bg-red-500/10 rounded-lg border border-red-500/20">
                            Failed to load jobs. Please try again later.
                        </div>
                    )}

                    {!isLoading && jobs.length === 0 && (
                        <div className="p-12 text-center text-muted-foreground bg-muted/20 rounded-lg border border-border border-dashed h-64 flex items-center justify-center flex-col gap-2">
                            <p className="font-medium text-lg">No jobs found</p>
                            <p className="text-sm">Try adjusting your filters or check back later.</p>
                        </div>
                    )}

                    {jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
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

                {/* Right Sidebar - Desktop Filter */}
                <div className="hidden lg:block lg:col-span-1 sticky top-4 order-1 lg:order-2">
                    <Filter />
                </div>
            </div>
        </div>
    )
}

function useInView({ threshold = 0 } = {}) {
    const [inView, setInView] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting)
            },
            { threshold }
        )

        const currentRef = ref.current
        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef)
            }
        }
    }, [threshold])

    return { ref, inView }
}

const JobSkeleton = () => {
    return (
        <div className="flex flex-col gap-6 w-full mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight">Explore Jobs</h1>
                    <p className="text-muted-foreground">Find your next opportunity from our curated list of positions.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-[300px]">
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div className="lg:hidden">
                        <Skeleton className="h-9 w-24 rounded-md" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                {/* Main Content - Job List */}
                <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
                    {[1, 2].map((i) => (
                        <Card key={i} className="group relative overflow-hidden border-border bg-card py-1 md:py-4">
                            {/* Mobile Skeleton */}
                            <div className="md:hidden p-4 space-y-4">
                                {/* Title + Company + Apply Button */}
                                <div className="flex items-center justify-between">
                                    <div className="space-y-2 flex-1">
                                        <Skeleton className="h-5 w-3/4" />
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-3 w-3" />
                                            <Skeleton className="h-3 w-32" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-8 w-16 rounded-md" />
                                </div>

                                {/* Pills Row */}
                                <div className="flex flex-wrap gap-2">
                                    <Skeleton className="h-5 w-28 rounded-full" />
                                    <Skeleton className="h-5 w-20 rounded-full" />
                                </div>

                                {/* Posted date */}
                                <Skeleton className="h-3 w-32" />
                            </div>

                            {/* Desktop Skeleton */}
                            <div className="hidden md:block">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-4 items-center">
                                            {/* Company Icon */}
                                            <Skeleton className="h-12 w-12 rounded-lg shrink-0" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-5 w-48" />
                                                <div className="flex items-center gap-2">
                                                    <Skeleton className="h-3.5 w-3.5" />
                                                    <Skeleton className="h-4 w-24" />
                                                    <Skeleton className="h-3 w-2" />
                                                    <Skeleton className="h-3 w-20" />
                                                </div>
                                            </div>
                                        </div>
                                        <Skeleton className="h-9 w-28 rounded-md" />
                                    </div>
                                </CardHeader>

                                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-border/50">
                                    {[1, 2, 3, 4].map((j) => (
                                        <div key={j} className="space-y-1">
                                            <div className="flex items-center gap-1.5">
                                                <Skeleton className="h-3.5 w-3.5" />
                                                <Skeleton className="h-3 w-12" />
                                            </div>
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                    ))}
                                </CardContent>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Right Sidebar - Skeleton */}
                <div className="hidden lg:block lg:col-span-1 sticky top-4 order-1 lg:order-2">
                    <Card className="h-fit">
                        <CardHeader className="border-b border-border pb-4 mb-4">
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-6 w-24" />
                                <Skeleton className="h-4 w-10" />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <Skeleton className="h-10 w-full mt-4" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
