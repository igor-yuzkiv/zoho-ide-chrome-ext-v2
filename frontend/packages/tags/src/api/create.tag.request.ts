import type { ITagEntity, SaveTagRequestPayload } from '../types'
import { apiClient } from '@zoho-ide/shared/api'

export function createTagRequest(payload: SaveTagRequestPayload): Promise<ITagEntity> {
    return apiClient.post<{ data: ITagEntity }>('tags', payload).then((r) => r.data.data)
}
