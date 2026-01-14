import { EducationCategory } from "./shared";

export interface NodeType {
    id: number;
    name: string;
    is_leaf: boolean;
}

export interface TutorialNode {
    id: number;
    title: string;
    slug: string;
    order: number;
    node_type: NodeType;
    parent_id: number | null;
    children: TutorialNode[];
    is_published?: boolean;
    content?: {
        video_url?: string;
        editorial?: string;
    };
}

export interface Tutorial {
    id: number;
    title: string;
    description: string;
    categories: EducationCategory[];
    slug: string;
    is_published: boolean;
    nodes: TutorialNode[];
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}