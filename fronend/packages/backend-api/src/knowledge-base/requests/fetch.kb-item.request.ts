import { apiClient } from '../../api.client.ts'
import type { IKnowledgeBaseItem } from '@zoho-ide/shared/entities/knowledge-base'

export async function fetchKbItemByIdRequest(itemId: string): Promise<{ data: IKnowledgeBaseItem }> {
    return apiClient
        .get<{ data: IKnowledgeBaseItem }>(`/knowledge-base/items/${itemId}`)
        .then((response) => response.data)
}
