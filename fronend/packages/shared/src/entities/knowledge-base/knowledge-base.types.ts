import type { IEntity } from '../../types'

export interface IKnowledgeBaseItem extends IEntity {
    id: string
    title: string
    content?: string
    parent_id?: string
}
