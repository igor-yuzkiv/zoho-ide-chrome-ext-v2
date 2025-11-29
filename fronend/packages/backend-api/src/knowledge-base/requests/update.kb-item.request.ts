import { apiClient } from '../../api.client.ts'
import type { SaveKbItemRequestPayload } from '../types'
import type { IKnowledgeBaseItem } from '@zoho-ide/shared/entities/knowledge-base'

export function updateKbItemRequest(itemId: string, payload: SaveKbItemRequestPayload): Promise<IKnowledgeBaseItem> {
    return apiClient
        .put<{ data: IKnowledgeBaseItem }>(`knowledge-base/items/${itemId}`, payload)
        .then((r) => r.data.data)
}
