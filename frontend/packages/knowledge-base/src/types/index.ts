import type { ITagEntity } from '@zoho-ide/tags'
import type { IEntity, IUser } from '@zoho-ide/shared/contracts'

export type TKnowledgeBaseCategory = 'general' | 'code_samples'

export type TKnowledgeBaseCategoryMetadata = {
    label: string
    value: TKnowledgeBaseCategory
    icon: string
}

export interface IKnowledgeBaseItem extends IEntity {
    id: string
    title: string
    content?: string
    parent_id?: string
    category?: TKnowledgeBaseCategory
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
    category?: TKnowledgeBaseCategory
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
    category?: TKnowledgeBaseCategory
}
