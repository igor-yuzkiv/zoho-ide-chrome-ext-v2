import { apiClient } from '@zoho-ide/shared'
import type { IKnowledgeBaseItem } from '../types'

export async function fetchKbItemByIdRequest(itemId: string): Promise<{ data: IKnowledgeBaseItem }> {
    return apiClient
        .get<{ data: IKnowledgeBaseItem }>(`/knowledge-base/items/${itemId}`)
        .then((response) => response.data)
}
