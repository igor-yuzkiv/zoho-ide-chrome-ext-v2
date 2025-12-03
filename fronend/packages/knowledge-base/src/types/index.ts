import type { IEntity, IUser } from '@zoho-ide/shared'
import type { ITagEntity } from '@zoho-ide/tags'

export interface IKnowledgeBaseItem extends IEntity {
    id: string
    title: string
    content?: string
    parent_id?: string
    created_at?: string
    updated_at?: string
    created_by?: string
    updated_by?: string
}

export interface IKnowledgeBaseItemDetails extends IKnowledgeBaseItem {
    tags: ITagEntity[]
    created_by_user?: IUser
    updated_by_user?: IUser
}

export interface SaveKbItemRequestPayload {
    title: string
    content?: string
    parentId?: string
    tags_ids?: string[]
}

export type KbItemFormData = Omit<SaveKbItemRequestPayload, 'tags_ids'> & {
    tags: ITagEntity[]
}

export type DeleteKbItemByIdResponse = { status: boolean; message: string }
