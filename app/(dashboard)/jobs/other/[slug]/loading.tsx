import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <>
            <div className="mb-8 flex flex-row md:items-start md:justify-between gap-6">
                <div className="space-y-3 flex-1">
                    {/* Date skeleton */}
                    <Skeleton className="h-4 w-32" />

                    {/* Title skeleton */}
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-8 w-1/2" />

                    {/* Badges skeleton */}
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-32 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                </div>

                {/* Actions skeleton */}
                <div className="pt-2 lg:pt-8 lg:shrink-0">
                    <Skeleton className="h-9 w-28 rounded-md" />
                </div>
            </div>

            {/* Content skeleton */}
            <div className="space-y-4">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
                <div className="py-2" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
                <div className="py-2" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
            </div>
        </>
    )
}
