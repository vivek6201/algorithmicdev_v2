import { BaseResponse, ListResponse } from "@/types/base"
import { Tutorial, TutorialNode } from "@/types/education/tutorial"
import { apiClient } from "../utils/api"

export const fetchAllTutorials = async (pageIndex: number, pageSize: number, search: string) => {
    try {
        const { data } = await apiClient<ListResponse<Tutorial>>({
            endpoint: "/api/edu/tutorials/",
            method: "GET",
            params: {
                page: pageIndex,
                page_size: pageSize,
                search: search
            }
        })
        return data.data
    } catch (error) {
        console.error(error);
        return null
    }
}

export const fetchTutorialBySlug = async (slug: string) => {
    try {
        const { data } = await apiClient<BaseResponse<Tutorial>>({
            endpoint: `/api/edu/tutorials/one/${slug}`,
            method: "GET"
        })
        return data.data
    } catch (error) {
        console.error(error);
        return null
    }
}

export const fetchNodeBySlug = async (tutorialSlug: string, nodeSlug: string) => {
    try {
        const { data } = await apiClient<BaseResponse<TutorialNode>>({
            endpoint: `/api/edu/tutorials/node/${tutorialSlug}/${nodeSlug}`,
            method: "GET"
        })
        return data.data
    } catch (error) {
        console.error(error);
        return null
    }
}

export const reactToContent = async (tutorialsSlug: string, tutorialNodeSlug: string, reaction: "LIKE" | "DISLIKE") => {
    try {
        const { data } = await apiClient<BaseResponse<Tutorial>>({
            endpoint: `/api/edu/tutorials/${tutorialsSlug}/${tutorialNodeSlug}/react`,
            method: "PATCH",
            body: {
                reaction: reaction
            }
        })
        return data.data
    } catch (error) {
        console.error(error);
        return null
    }
}