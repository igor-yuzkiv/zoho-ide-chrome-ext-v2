export type ZohoCrmFunction = {
    id: string
    api_name?: string
    display_name?: string
    category: string
    createdTime: number
    updatedTime: number | null
    description: string | null
    language: string
    source: string
    params?: unknown[]
    return_type?: string | null
    script?: string | null
    workflow?: string | null
}
