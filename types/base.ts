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

export interface User {
    id: string
    email: string
    role: string
}

export interface UserProfile extends User {
    username: string
    name: string
    created_at: string
    updated_at: string
}