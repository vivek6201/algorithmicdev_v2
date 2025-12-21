import { BaseResponse, ListResponse } from "@/types/base"
import { apiClient } from "../api"
import { Blog, BlogMetadata } from "@/types/blog"

export const fetchBlogs = async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}) => {
    const { data } = await apiClient<ListResponse<Blog>>({
        endpoint: `/api/edu/blogs?page=${page}&limit=${limit}`,
        method: "GET"
    })
    return data.data
}

export const fetchBlogBySlug = async (slug: string) => {
    const { data } = await apiClient<BaseResponse<Blog>>({
        endpoint: `/api/edu/blogs/one/${slug}`,
        method: "GET"
    })
    return data.data
}

export const fetchBlogMetadata = async (blogSlug: string) => {
    const { data } = await apiClient<BaseResponse<BlogMetadata>>({
        endpoint: `/api/edu/blogs/${blogSlug}/metadata`,
        method: "GET"
    })
    return data.data
}

export const performReaction = async (blogSlug: string, action: 'like' | 'dislike' | 'bookmark') => {
    const { data } = await apiClient<BaseResponse<BlogMetadata>>({
        endpoint: `/api/edu/blogs/${blogSlug}/react`,
        method: "PATCH",
        params: { action }
    })
    return data.data ?? null
}