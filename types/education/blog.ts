export interface FileType {
    url: string
    size: string
    type: string
    extension: string
}

export interface Blog {
    id: string
    title: string
    slug: string
    description: string
    content: string
    thumbnail: FileType
    created_at: string
    updated_at: string
}

export interface BlogMetadata {
    likes: number
    dislikes: number
    current_reaction: 'LIKE' | 'DISLIKE' | null
}