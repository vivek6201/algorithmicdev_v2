"use client"

import { usePathname } from "next/navigation";
import { fetchTutorialBySlug } from "@/lib/routes/tutorials";
import { TutorialNode } from "@/types/education/tutorial";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FileText, Folder, FolderOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NodeItem = ({ node, parentPath }: { node: TutorialNode; parentPath: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isFolder = !node.node_type.is_leaf;
    const hasChildren = node.children && node.children.length > 0;

    // Construct the path for this node: parentPath + "/" + node.slug
    // Ensure parentPath doesn't end with slash to avoid double slashes
    const cleanParentPath = parentPath.endsWith('/') ? parentPath.slice(0, -1) : parentPath;
    const currentPath = `${cleanParentPath}/${node.slug}`;

    const handleToggle = () => {
        if (isFolder) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className="w-full select-none text-sm">
            <div
                className={cn(
                    "flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer transition-all duration-200",
                    isFolder
                        ? "hover:translate-x-1 hover:font-medium text-muted-foreground hover:text-foreground"
                        : "hover:bg-accent/50 hover:font-medium text-muted-foreground hover:text-foreground"
                )}
                onClick={handleToggle}
            >
                {isFolder ? (
                    <>
                        {isOpen ? (
                            <FolderOpen className="h-4 w-4 text-orange-500 fill-orange-500/20" />
                        ) : (
                            <Folder className="h-4 w-4 text-orange-500 fill-orange-500/20" />
                        )}
                    </>
                ) : (
                    <span className="">
                        <FileText className="h-4 w-4 text-sky-500" />
                    </span>
                )}

                <span className="truncate">
                    {node.title}
                </span>
            </div>

            {isFolder && isOpen && hasChildren && (
                <div className="flex flex-col pl-2 border-l border-border/50">
                    {node.children.map((child) => (
                        <NodeItem key={child.id} node={child} parentPath={currentPath} />
                    ))}
                </div>
            )}

            {/* If it's a leaf node, we wrap the click in a Link, OR we make the whole div a link. 
                The current implementation had a Link wrapping the content for files. 
                Let's restore that pattern using the new currentPath. */}
            {!isFolder && (
                <Link href={currentPath} className="absolute inset-0 z-10" />
            )}
        </div>
    );
};


const NodeItemWrapper = ({ node, parentPath }: { node: TutorialNode; parentPath: string }) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const isFolder = !node.node_type.is_leaf;
    const hasChildren = node.children && node.children.length > 0;

    const cleanParentPath = parentPath.endsWith('/') ? parentPath.slice(0, -1) : parentPath;
    const currentPath = `${cleanParentPath}/${node.slug}`;

    const isActive = pathname === currentPath;

    // Auto-expand if the current path starts with this folder's path (meaning a child is active)
    useEffect(() => {
        if (isFolder && pathname && pathname.startsWith(currentPath + "/")) {
            setIsOpen(true);
        }
    }, [pathname, currentPath, isFolder]);

    const handleToggle = () => {
        if (isFolder) {
            setIsOpen(!isOpen);
        }
    };

    const content = (
        <div
            className={cn(
                "flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer transition-all duration-200",
                isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : isFolder
                        ? "hover:translate-x-1 hover:font-medium text-muted-foreground hover:text-foreground"
                        : "hover:bg-accent/50 hover:font-medium text-muted-foreground hover:text-foreground"
            )}
            onClick={isFolder ? handleToggle : undefined}
        >
            {isFolder ? (
                <>
                    {isOpen ? (
                        <FolderOpen className={cn("h-4 w-4", isActive ? "text-primary fill-primary/20" : "text-orange-500 fill-orange-500/20")} />
                    ) : (
                        <Folder className={cn("h-4 w-4", isActive ? "text-primary fill-primary/20" : "text-orange-500 fill-orange-500/20")} />
                    )}
                </>
            ) : (
                <span className="">
                    <FileText className={cn("h-4 w-4", isActive ? "text-primary" : "text-sky-500")} />
                </span>
            )}

            <span className="truncate">
                {node.title}
            </span>
        </div>
    )

    return (
        <div className="w-full select-none text-sm relative">
            {isFolder ? content : (
                <Link href={currentPath} className="block">
                    {content}
                </Link>
            )}

            {isFolder && isOpen && hasChildren && (
                <div className="flex flex-col pl-2 border-l border-border/50">
                    {node.children.map((child) => (
                        <NodeItemWrapper key={child.id} node={child} parentPath={currentPath} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function NodesList({ nodes, tutorialSlug, parentPath }: { nodes?: TutorialNode[]; tutorialSlug: string; parentPath?: string }) {
    const { data, isLoading } = useSuspenseQuery({
        queryKey: ["tutorial", tutorialSlug],
        queryFn: () => fetchTutorialBySlug(tutorialSlug),
    });

    const displayNodes = nodes || data?.nodes;
    // Default base path is /tutorials/slug if no parentPath provided
    const basePath = parentPath || `/tutorials/${tutorialSlug}`;

    if (isLoading && !nodes) return <div className="p-4 text-sm text-muted-foreground">Loading nodes...</div>;
    if (!displayNodes || displayNodes.length === 0) return <div className="p-4 text-sm text-muted-foreground">No lessons found.</div>;

    return (
        <div className="flex flex-col w-full">
            {displayNodes.map((node) => (
                <NodeItemWrapper key={node.id} node={node} parentPath={basePath} />
            ))}
        </div>
    );
}
