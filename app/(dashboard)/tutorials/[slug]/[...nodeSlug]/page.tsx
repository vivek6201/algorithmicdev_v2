import { fetchNodeBySlug } from "@/lib/routes/tutorials";
import { TutorialNode } from "@/types/education/tutorial";
import { lazyLoadClient } from "@/lib/lazy";

const ContentView = lazyLoadClient<{ node: TutorialNode }>(() => import("@/components/pages/dashboard/tutorials/view/content-view").then(mod => ({ default: mod.default })))
const FolderView = lazyLoadClient<{ node: TutorialNode; currentPath: string }>(() => import("@/components/pages/dashboard/tutorials/view/folder-view").then(mod => ({ default: mod.default })))

export default async function page({ params }: { params: Promise<{ slug: string, nodeSlug: string[] }> }) {
    const { slug, nodeSlug } = await params;
    const targetNodeSlug = nodeSlug[nodeSlug.length - 1];

    const currentPath = `/tutorials/${slug}/${nodeSlug.join('/')}`;

    let data;
    try {
        data = await fetchNodeBySlug(slug, targetNodeSlug);

        if (!data) {
            return (
                <div className="p-12 text-center border rounded-lg border-dashed">
                    <h2 className="font-bold text-xl text-muted-foreground">Content not found</h2>
                </div>
            )
        }
    }
    catch (error) {
        console.error(error);
        return (
            <div className="p-12 text-center text-muted-foreground">Something went wrong</div>
        )
    }

    const isFolder = !data.node_type.is_leaf;

    return (
        <div className="w-full">
            {isFolder ? (
                <FolderView node={data} currentPath={currentPath} />
            ) : (
                <ContentView node={data} />
            )}
        </div>
    )
}
