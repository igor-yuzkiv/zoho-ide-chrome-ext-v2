import type { EntityRef, IEntity } from '../../types'

export interface IAttachment extends IEntity {
    id: string
    file_name: string
    extension: string
    mime_type?: string
    size?: number
    role?: string
    entity_ref?: EntityRef
    public_link: string
    created_at: string
    updated_at?: string
}
