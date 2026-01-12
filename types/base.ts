export interface BaseResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: any;
}

export interface PaginatedData<T> {
    data: T[];
    total_items: number;
    total_pages: number;
    page: number;
    limit: number;
}

export interface ListResponse<T> extends BaseResponse<PaginatedData<T>> { }