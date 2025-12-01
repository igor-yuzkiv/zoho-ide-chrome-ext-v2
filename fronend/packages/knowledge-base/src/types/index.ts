import type { IEntity } from '@zoho-ide/shared'
import type { ITagEntity } from '@zoho-ide/tags'

export interface IKnowledgeBaseItem extends IEntity {
    id: string
    title: string
    content?: string
    parent_id?: string
    tags?: ITagEntity[]
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
