import type { ITagEntity, SearchTagsRequestPayload } from '../types'
import { apiClient } from '@zoho-ide/shared/api'

export function searchTagsRequest(payload: SearchTagsRequestPayload): Promise<ITagEntity[]> {
    return apiClient.post<{ data: ITagEntity[] }>('tags/search', payload).then((r) => r.data.data)
}
