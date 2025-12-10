import { ExternalJob, ListingType } from "@/types/job"
import { apiClient } from "../api"
import { BaseResponse, ListResponse } from "@/types/base"

export const fetchExternalJobs = async ({ page = 1, limit = 10 }: { page?: number, limit?: number } = {}) => {
    const { data } = await apiClient<ListResponse<ExternalJob>>({
        endpoint: `/api/jobs/`,
        method: "GET",
        params: {
            type: ListingType.ThirdParty,
            page,
            limit
        }
    })
    return data.data
}

export const fetchJobDetail = async (slug: string) => {
    const { data } = await apiClient<BaseResponse<ExternalJob>>({
        endpoint: `/api/jobs/one/${slug}`,
        method: "GET"
    })
    return data.data
}