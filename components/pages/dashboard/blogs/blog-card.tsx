"use client"

import { Blog } from "@/types/blog"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BlogCardProps {
    blog: Blog
}

export default function BlogCard({ blog }: BlogCardProps) {
    const formattedDate = new Date(blog.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })

    // Estimate reading time (roughly 200 words per minute)
    const wordCount = blog.content?.split(/\s+/).length || 0
    const readingTime = Math.max(1, Math.ceil(wordCount / 200))

    return (
        <Link href={`/blogs/${blog.slug}`} className="block group" target="_blank">
            <article className="relative overflow-hidden rounded-2xl bg-linear-to-br from-card via-card to-card/80 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
                {/* linear overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex flex-col sm:flex-row">
                    {/* Thumbnail */}
                    <div className="relative w-full sm:w-64 lg:w-72 h-52 sm:h-auto shrink-0 overflow-hidden">
                        {blog.thumbnail?.url ? (
                            <Image
                                src={blog.thumbnail.url}
                                alt={blog.title}
                                fill
                                sizes="(max-width: 640px) 100vw, 288px"
                                loading="lazy"
                                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                        ) : (
                            <div className="w-full h-full bg-linear-to-br from-primary/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                <span className="text-4xl font-bold text-primary/30">
                                    {blog.title.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5 sm:p-6 relative">
                        {/* Floating arrow indicator */}
                        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                                <ArrowUpRight className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                            </div>
                        </div>

                        {/* Meta badges */}
                        <div className="flex items-center gap-2 mb-3">
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-0 font-medium text-xs px-2.5 py-0.5">
                                <Calendar className="w-3 h-3 mr-1" />
                                {formattedDate}
                            </Badge>
                            <Badge variant="secondary" className="bg-muted text-muted-foreground border-0 font-medium text-xs px-2.5 py-0.5">
                                <Clock className="w-3 h-3 mr-1" />
                                {readingTime} min read
                            </Badge>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight line-clamp-2 mb-2 pr-12 group-hover:text-primary transition-colors duration-300">
                            {blog.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3 leading-relaxed flex-1">
                            {blog.description}
                        </p>

                        {/* Bottom accent line */}
                        <div className="mt-4 pt-4 border-t border-border/50">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-primary group-hover:underline underline-offset-4">
                                    Read article
                                </span>
                                <ArrowUpRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    )
}
