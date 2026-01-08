"use client";

import { TutorialNode } from "@/types/education/tutorial";
import { lazyLoadClient } from "@/lib/lazy";

const NodeCard = lazyLoadClient<{ node: TutorialNode; parentPath: string }>(() => import("../node-card").then(mod => ({ default: mod.default })))

export default function FolderView({ node, currentPath }: { node: TutorialNode; currentPath: string }) {
    if (!node.children || node.children.length === 0) {
        return <div className="p-8 text-center text-muted-foreground border rounded-lg border-dashed">Empty folder</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                {node.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {node.children.map((child) => (
                    <NodeCard
                        key={child.id}
                        node={child}
                        parentPath={currentPath}
                    />
                ))}
            </div>
        </div>
    );
}
