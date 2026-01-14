import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="p-6">
            <div className="mb-8 flex flex-row md:items-start md:justify-between gap-6">
                <div className="space-y-3 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-8 w-1/2" />
                </div>

                <div className="pt-2 lg:pt-8 lg:shrink-0">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-9 w-16 rounded-md" />
                        <Skeleton className="h-9 w-16 rounded-md" />
                        <Skeleton className="h-9 w-20 rounded-md" />
                        <Skeleton className="h-9 w-9 rounded-md" />
                    </div>
                </div>
            </div>

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
            </div>
        </div>
    )
}
