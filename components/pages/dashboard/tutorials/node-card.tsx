"use client"

import { TutorialNode } from "@/types/education/tutorial"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface NodeCardProps {
    node: TutorialNode
    tutorialSlug?: string
    parentPath?: string
}

export default function NodeCard({ node, tutorialSlug, parentPath }: NodeCardProps) {
    const href = parentPath
        ? `${parentPath}/${node.slug}`
        : `/tutorials/${tutorialSlug}/${node.slug}`;

    return (
        <Link href={href} className="block group w-full">
            <Card className="relative h-[220px] border-0 overflow-hidden bg-primary text-primary-foreground transition-all duration-300 hover:shadow-xl group-hover:scale-[1.01] cursor-pointer">
                {/* Top Right Curved Shape */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-foreground/10 rounded-bl-[100px] z-10" />

                {/* Bottom Left Curved Shape */}
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/10 rounded-tr-[100px] z-10" />

                {/* Content Container - Centered */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6 text-center">
                    {/* Node Type (Small) */}
                    <span className="text-primary-foreground/90 px-3 py-0.5 rounded-full bg-primary-foreground/10 text-sm font-medium mb-2 tracking-wide opacity-90 backdrop-blur-sm">
                        {node.node_type?.name}
                    </span>

                    {/* Node Title (Large) */}
                    <h3 className="text-2xl font-bold text-primary-foreground tracking-tight leading-snug line-clamp-3 mb-2">
                        {node.title}
                    </h3>

                    {!node.node_type.is_leaf && node.children && (
                        <span className="text-xs text-primary-foreground/70 font-medium">
                            {node.children.length} {node.children.length === 1 ? 'item' : 'items'}
                        </span>
                    )}
                </div>
            </Card>
        </Link>
    )
}
