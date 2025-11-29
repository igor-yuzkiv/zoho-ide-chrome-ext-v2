import type { IEntity } from '@zoho-ide/shared/types'

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

export type EditorImageUploadPayload = {
    files: File[];
    callback: (urls: string[]) => void
}