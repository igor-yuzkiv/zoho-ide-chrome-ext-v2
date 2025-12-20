import type { IKnowledgeBaseItem, SaveKbItemRequestPayload } from '../types'
import { apiClient } from '@zoho-ide/shared'

export function createKbItemRequest(payload: SaveKbItemRequestPayload): Promise<IKnowledgeBaseItem> {
    return apiClient.post<{ data: IKnowledgeBaseItem }>('knowledge-base/items', payload).then((r) => r.data.data)
}
