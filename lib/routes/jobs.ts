import { ListingType } from "@/types/job"
import { apiClient } from "../api"
import { ExternalJobListResponse, ExternalJobResponse } from "@/types/base"

export const fetchExternalJobs = async () => {
    const { data } = await apiClient<ExternalJobListResponse>({
        endpoint: `/api/jobs/`,
        method: "GET",
        params: {
            type: ListingType.ThirdParty
        }
    })
    return data.data
}

export const fetchJobDetail = async (slug: string) => {
    const { data } = await apiClient<ExternalJobResponse>({
        endpoint: `/jobs/one/${slug}`,
        method: "GET"
    })
    return data.data
}