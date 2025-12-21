import { fetchBlogBySlug } from "@/lib/routes/blogs";
import { Metadata } from "next";
import { formatDate } from "@/lib/utils";
import ContentRenderer from "@/components/pages/dashboard/content-renderer";
import BlogActions from "@/components/pages/dashboard/blogs/blog-actions";

async function getData(slug: string) {
    const response = await fetchBlogBySlug(slug)
    return response
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getData(slug);

    if (!blog) {
        return {
            title: "Blog Not Found",
        }
    }

    return {
        title: blog.title,
        description: blog.description,
        openGraph: {
            title: blog.title,
            description: blog.description,
            type: 'article',
            images: blog.thumbnail?.url ? [blog.thumbnail.url] : [],
        }
    }
}

async function page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = await getData(slug)

    if (!blog) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold mb-2">Blog not found</h1>
                <p className="text-muted-foreground">The blog post you&apos;re looking for doesn&apos;t exist.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8 flex flex-row md:items-start md:justify-between gap-6">
                <div className="space-y-2 flex-1">
                    {/* Date */}
                    <div className="text-sm text-muted-foreground font-medium">
                        {formatDate(blog.created_at)}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                        {blog.title}
                    </h2>
                </div>

                {/* Actions - Right side on desktop */}
                <div className="pt-2 lg:pt-8 lg:shrink-0">
                    <BlogActions blogSlug={blog.slug} />
                </div>
            </div>

            <ContentRenderer content={blog.content} />
        </div>
    )
}

export default page