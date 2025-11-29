import { apiClient } from '../../api.client.ts'
import type { SaveKbItemRequestPayload } from '../knowledge-base.api.types.ts'
import type { IKnowledgeBaseItem } from '@zoho-ide/shared/entities/knowledge-base'

export function createKbItemRequest(payload: SaveKbItemRequestPayload): Promise<IKnowledgeBaseItem> {
    return apiClient.post<{ data: IKnowledgeBaseItem }>('knowledge-base/items', payload).then((r) => r.data.data)
}
