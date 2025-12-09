"use client"

import { fetchExternalJobs } from "@/lib/routes/jobs"
import { useQuery } from "@tanstack/react-query"
import JobCard from "./JobCard"
import Filter from "./Filter"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function JobList({ fetchFor }: { fetchFor: "other" | "direct" }) {
    const getData = async () => {
        switch (fetchFor) {
            case "other":
                return fetchExternalJobs()
            case "direct":
            // return fetchDirectJobs()
        }
    }

    const { data, isLoading, error } = useQuery({
        queryKey: [`${fetchFor}-jobs`],
        queryFn: getData
    })

    if (isLoading) {
        return <JobSkeleton />
    }

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
                            className="w-full bg-background pl-9 focus:bg-background transition-all"
                        />
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

                    {data && data.length === 0 && (
                        <div className="p-12 text-center text-muted-foreground bg-muted/20 rounded-lg border border-border border-dashed h-64 flex items-center justify-center flex-col gap-2">
                            <p className="font-medium text-lg">No jobs found</p>
                            <p className="text-sm">Try adjusting your filters or check back later.</p>
                        </div>
                    )}

                    {data?.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>

                {/* Right Sidebar - Desktop Filter */}
                <div className="hidden lg:block lg:col-span-1 sticky top-4 order-1 lg:order-2">
                    <Filter />
                </div>
            </div>
        </div>
    )
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
                        <Card key={i} className="group relative overflow-hidden border-border bg-card">
                            <CardHeader className="p-5 pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4 w-full">
                                        <Skeleton className="h-12 w-12 rounded-lg shrink-0" />
                                        <div className="space-y-2 w-full max-w-sm">
                                            <Skeleton className="h-5 w-3/4" />
                                            <div className="flex items-center gap-2">
                                                <Skeleton className="h-3 w-4" />
                                                <Skeleton className="h-3 w-32" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-6 w-16 rounded-full" />
                                        <Skeleton className="h-8 w-8 rounded-md" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-5 pt-2 pb-4 space-y-4">
                                <div className="flex gap-2">
                                    <Skeleton className="h-5 w-16 rounded-full" />
                                    <Skeleton className="h-5 w-20 rounded-full" />
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border/50">
                                    {[1, 2, 3, 4].map((j) => (
                                        <div key={j} className="space-y-1">
                                            <Skeleton className="h-3 w-12" />
                                            <Skeleton className="h-4 w-20" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="p-5 pt-0 flex items-center justify-between">
                                <Skeleton className="h-3 w-40" />
                                <div className="flex gap-3">
                                    <Skeleton className="h-9 w-24 rounded-md" />
                                    <Skeleton className="h-9 w-24 rounded-md" />
                                </div>
                            </CardFooter>
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
