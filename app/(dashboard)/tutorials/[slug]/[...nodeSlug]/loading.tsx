import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-8 w-full max-w-4xl pt-4">
            {/* Header Section */}
            <div className="space-y-4 border-b pb-6">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-24" />
                </div>

                <Skeleton className="h-10 w-3/4 max-w-[600px]" />
            </div>

            {/* Content Body */}
            <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[95%]" />
                <Skeleton className="h-4 w-[80%]" />

                <div className="pt-8 space-y-4">
                    <Skeleton className="h-32 w-full rounded-xl" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[85%]" />
                </div>
            </div>
        </div>
    )
}
