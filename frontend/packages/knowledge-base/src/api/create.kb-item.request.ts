import { apiClient } from '@zoho-ide/shared'
import type { IKnowledgeBaseItem, SaveKbItemRequestPayload } from '../types'

export function createKbItemRequest(payload: SaveKbItemRequestPayload): Promise<IKnowledgeBaseItem> {
    return apiClient.post<{ data: IKnowledgeBaseItem }>('knowledge-base/items', payload).then((r) => r.data.data)
}
