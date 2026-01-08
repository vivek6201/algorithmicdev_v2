import { lazyLoadClient } from "@/lib/lazy";
import { fetchTutorialBySlug } from "@/lib/routes/tutorials";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const TutorialLayoutGeneric = lazyLoadClient<{ tutorialSlug: string, children: React.ReactNode }>(async () => {
    return import("@/components/pages/dashboard/tutorials/tutorial-layout-client")
});

export default async function Layout({ params, children }: { params: Promise<{ slug: string }>, children: React.ReactNode }) {
    const { slug } = await params;
    const queryClient = new QueryClient();

    try {
        await queryClient.prefetchQuery({
            queryKey: ["tutorial", slug],
            queryFn: () => fetchTutorialBySlug(slug),
        });
    } catch (error) {
        console.error(error);
        return <div className="p-12 text-center text-muted-foreground">Tutorial not found</div>
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <TutorialLayoutGeneric tutorialSlug={slug}>
                {children}
            </TutorialLayoutGeneric>
        </HydrationBoundary>
    )
}
