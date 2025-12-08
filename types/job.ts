export enum ListingType {
    ThirdParty = "ThirdParty",
    Direct = "Direct"
}

export enum JobType {
    FullTime = "FULL_TIME",
    PartTime = "PART_TIME",
    Internship = "INTERN",
    Contract = "CONTRACT"
}

export interface Category {
    id: number
    name: string
}

export interface Job {
    id: number | string;
    title: string;
    slug: string;
    description: string;
    location: string;
    job_type: JobType;
    min_salary: number;
    max_salary: number;
    categories?: Category[];
    listing_type: ListingType;
    created_at: string;
    updated_at: string;
}

export interface ExternalJob extends Job {
    external_apply_url: string;
    company_name: string;
}

export interface DirectJob extends Job {
    company_id: string;
}