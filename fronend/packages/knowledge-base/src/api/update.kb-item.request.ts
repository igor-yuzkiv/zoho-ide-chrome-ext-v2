import type { IKnowledgeBaseItem, SaveKbItemRequestPayload } from '../types'
import { apiClient } from '@zoho-ide/shared'

export function updateKbItemRequest(itemId: string, payload: SaveKbItemRequestPayload): Promise<IKnowledgeBaseItem> {
    return apiClient
        .put<{ data: IKnowledgeBaseItem }>(`knowledge-base/items/${itemId}`, payload)
        .then((r) => r.data.data)
}
