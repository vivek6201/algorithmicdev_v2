import { ExternalJob } from "./job";

export interface BaseResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: any;
}

export interface ExternalJobListResponse extends BaseResponse<ExternalJob[]> {
    data: ExternalJob[]
}

export interface ExternalJobResponse extends BaseResponse<ExternalJob> {
    data: ExternalJob
}