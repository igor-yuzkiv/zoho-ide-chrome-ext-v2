import { apiClient } from '@zoho-ide/shared'
import type { IKnowledgeBaseItemDetails } from '../types'

export async function fetchKbItemByIdRequest(itemId: string): Promise<{ data: IKnowledgeBaseItemDetails }> {
    return apiClient
        .get<{ data: IKnowledgeBaseItemDetails }>(`/knowledge-base/items/${itemId}`)
        .then((response) => response.data)
}
