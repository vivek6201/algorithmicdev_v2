import { fetchAllTutorials } from "@/lib/routes/tutorials"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { lazyLoadClient } from "@/lib/lazy"

const TutorialList = lazyLoadClient(() => import("@/components/pages/dashboard/tutorials/tutorial-list").then(mod => ({ default: mod.default })))

export default async function page() {
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
        queryKey: ["tutorials"],
        queryFn: ({ pageParam }) => fetchAllTutorials(pageParam, 10, ""),
        initialPageParam: 1,
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <TutorialList />
        </HydrationBoundary>
    )
}
