import type { IEntity } from '@zoho-ide/shared'

export interface IKnowledgeBaseItem extends IEntity {
    id: string
    title: string
    content?: string
    parent_id?: string
}


export interface SaveKbItemRequestPayload {
    title: string
    content?: string
    parentId?: string
}