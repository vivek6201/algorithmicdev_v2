import { TutorialNode } from "@/types/education/tutorial";
import { lazyLoadClient } from "@/lib/lazy";

const ContentRenderer = lazyLoadClient<{ content: string }>(() => import("@/components/pages/dashboard/content-renderer").then(mod => ({ default: mod.default })))

export default function ContentView({ node }: { node: TutorialNode }) {
    if (!node) {
        return (
            <div className="p-8 text-center text-muted-foreground border rounded-lg border-dashed">
                Content not available
            </div>
        )
    }

    return (
        <div className="space-y-8 w-full">
            {/* Header Section */}
            <div className="space-y-4 border-b pb-6">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                    {node.title}
                </h1>
            </div>

            {/* Content Body */}
            <div className="">
                {node.content ? (
                    <ContentRenderer content={node.content.editorial!} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
                        <p>No content added yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
