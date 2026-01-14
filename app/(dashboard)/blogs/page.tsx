import { lazyLoadClient } from "@/lib/lazy";

const BlogList = lazyLoadClient(() => import("@/components/pages/dashboard/blogs/blog-list").then(mod => ({ default: mod.default })))

export const metadata = {
    title: "Blogs | AlgorithmicDev",
    description: "Curated Technical Blogs for Developers",
}

function page() {
    return (
        <div className="p-6">
            <BlogList />
        </div>
    )
}

export default page