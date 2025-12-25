import type { IEntity } from '@zoho-ide/shared/contracts'

export interface ITagEntity extends IEntity {
    id: string
    name: string
    color?: string
}

export type SaveTagRequestPayload = {
    name: string
    color?: string
}

export type SearchTagsRequestPayload = {
    search_term?: string
    limit?: number
}
