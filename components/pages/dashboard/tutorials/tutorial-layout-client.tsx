"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, PanelLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { fetchTutorialBySlug } from "@/lib/routes/tutorials";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { TutorialNode } from "@/types/education/tutorial";
import { lazyLoadClient } from "@/lib/lazy";
import { useSuspenseQuery } from "@tanstack/react-query";

const NodesList = lazyLoadClient<{ tutorialSlug: string }>(() => import("./nodes-list").then(mod => ({ default: mod.default })))

interface TutorialLayoutGenericProps {
    tutorialSlug: string;
    children: React.ReactNode;
}

// Helper to flatten nodes into a linear list of navigable items
const flattenTutorialNodes = (nodes: TutorialNode[], parentPath: string): { node: TutorialNode; href: string }[] => {
    let result: { node: TutorialNode; href: string }[] = [];

    nodes.forEach(node => {
        const currentPath = `${parentPath}/${node.slug}`;

        // If it's a leaf (content), add it to the list
        if (node.node_type.is_leaf) {
            result.push({ node, href: currentPath });
        }

        // If it has children, recurse
        if (node.children && node.children.length > 0) {
            result = result.concat(flattenTutorialNodes(node.children, currentPath));
        }
    });

    return result;
};

export default function TutorialLayoutGeneric({
    tutorialSlug,
    children,
}: TutorialLayoutGenericProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();

    const { data: tutorial, isError, error, isLoading } = useSuspenseQuery({
        queryKey: ["tutorial", tutorialSlug],
        queryFn: () => fetchTutorialBySlug(tutorialSlug),
    });

    if (isLoading) {
        return (
            <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center">
                <div className="animate-pulse text-muted-foreground">Loading tutorial...</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center gap-4 p-8">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h3 className="text-2xl font-semibold tracking-tight text-destructive">Error Loading Tutorial</h3>
                    <p className="text-muted-foreground max-w-sm">
                        {error?.message || "An unexpected error occurred while loading the tutorial."}
                    </p>
                </div>
                <Button asChild variant="outline">
                    <Link href="/dashboard/tutorials">Back to Tutorials</Link>
                </Button>
            </div>
        );
    }

    if (!tutorial) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h3 className="text-2xl font-semibold tracking-tight">Tutorial not found</h3>
                    <p className="text-muted-foreground max-w-sm">
                        The tutorial you're looking for doesn't exist or may have been removed.
                    </p>
                </div>
                <Button asChild variant="outline">
                    <Link href="/dashboard/tutorials">Back to Tutorials</Link>
                </Button>
            </div>
        )
    }

    // Calculate next/prev links
    const { prev, next } = useMemo(() => {
        if (!tutorial?.nodes) return { prev: null, next: null };

        const flatList = flattenTutorialNodes(tutorial.nodes, `/tutorials/${tutorialSlug}`);
        const currentIndex = flatList.findIndex(item => item.href === pathname);

        if (currentIndex === -1) {
            if (pathname === `/tutorials/${tutorialSlug}`) {
                return { prev: null, next: flatList.length > 0 ? flatList[0] : null };
            }
            return { prev: null, next: null };
        }

        return {
            prev: currentIndex > 0 ? flatList[currentIndex - 1] : null,
            next: currentIndex < flatList.length - 1 ? flatList[currentIndex + 1] : null,
        };
    }, [tutorial, pathname, tutorialSlug]);

    return (
        <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden">
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden lg:flex flex-col border-r bg-background transition-all duration-300 ease-in-out",
                    isSidebarOpen ? "w-72" : "w-0 overflow-hidden border-none"
                )}
            >
                <div className="h-full w-72 overflow-hidden"> {/* Fixed width container to prevent content squishing */}
                    <ScrollArea className="h-full">
                        <div className="p-4">
                            <NodesList tutorialSlug={tutorialSlug} />
                        </div>
                    </ScrollArea>
                </div>
            </aside>

            <div className="flex flex-1 flex-col overflow-hidden min-w-0 bg-background relative">
                {/* Top Header */}
                <header className="flex h-14 items-center justify-between gap-4 border-b bg-background px-4">
                    <div className="flex gap-2 items-center">
                        <div className="flex items-center gap-2">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="lg:hidden">
                                        <PanelLeft className="h-5 w-5" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[80%] sm:w-[350px] p-0">
                                    <ScrollArea className="h-full py-6">
                                        <div className="px-4">
                                            <NodesList tutorialSlug={tutorialSlug} />
                                        </div>
                                    </ScrollArea>
                                </SheetContent>
                            </Sheet>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="hidden lg:flex"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                <PanelLeft className="h-5 w-5" />
                                <span className="sr-only">Toggle sidebar</span>
                            </Button>
                        </div>

                        <p className="flex items-center gap-2 font-semibold truncate sm:max-w-md max-w-[150px]">
                            {tutorial?.title}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant={"secondary"}
                            size={"sm"}
                            className="opacity-70 cursor-pointer"
                            disabled={!prev}
                            asChild={!!prev}
                        >
                            {prev ? (
                                <Link href={prev.href}>
                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                    Prev
                                </Link>
                            ) : (
                                <span className="flex items-center text-muted-foreground">
                                    <ChevronLeft className="w-4 h-4 mr-1" />
                                    Prev
                                </span>
                            )}
                        </Button>
                        <Button
                            variant={"secondary"}
                            size={"sm"}
                            className="opacity-70 cursor-pointer"
                            disabled={!next}
                            asChild={!!next}
                        >
                            {next ? (
                                <Link href={next.href}>
                                    Next
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>
                            ) : (
                                <span className="flex items-center text-muted-foreground">
                                    Next
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </span>
                            )}
                        </Button>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
