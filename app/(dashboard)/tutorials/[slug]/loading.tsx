import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function Loading() {
    return (
        <div className="flex flex-col h-full bg-background">
            {/* Header Skeleton */}
            <div className="flex-none p-6 md:p-8 space-y-4 border-b bg-card/30">
                <div className="max-w-4xl space-y-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-3/4 max-w-[600px]" />
                    <div className="flex flex-wrap gap-2 pt-2">
                        <Skeleton className="h-5 w-20 rounded-full" />
                        <Skeleton className="h-5 w-24 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Grid Skeleton */}
            <div className="flex-1 p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Card key={i} className="h-[220px] border-0 overflow-hidden bg-primary/5">
                            <Skeleton className="h-full w-full opacity-50" />
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}