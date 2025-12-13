import type { IEntity, IUser } from '@zoho-ide/shared'
import type { ITagEntity } from '@zoho-ide/tags'

export type KnowledgeBaseCategory = 'general' | 'code_samples'

export type KnowledgeBaseCategoryMetadata = {
    label: string
    value: KnowledgeBaseCategory
}

export interface IKnowledgeBaseItem extends IEntity {
    id: string
    title: string
    content?: string
    parent_id?: string
    category?: KnowledgeBaseCategory
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
    category?: KnowledgeBaseCategory
    tags_ids?: string[]
}

export interface CreateKbItemFromTemplateRequestPayload extends SaveKbItemRequestPayload {
    attributes?: Record<string, string>
}

export type DeleteKbItemByIdResponse = { status: boolean; message: string }

export type KbItemFormData = Omit<SaveKbItemRequestPayload, 'tags_ids'> & {
    tags: ITagEntity[]
}

export interface IKnowledgeBaseTemplate extends IEntity {
    id: string
    key: string
    name: string
    content?: string
    category?: KnowledgeBaseCategory
}
