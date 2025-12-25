import type { IKnowledgeBaseItem } from '../types'
import { apiClient, buildQueryParams } from '@zoho-ide/shared/api'
import type { PaginationParams, PagingResponse } from '@zoho-ide/shared/contracts'

export async function searchKbItemsRequest(
    searchTerm = '',
    paging: PaginationParams = { page: 1, per_page: 15 }
): Promise<PagingResponse<IKnowledgeBaseItem[]>> {
    return apiClient
        .get<PagingResponse<IKnowledgeBaseItem[]>>(`/knowledge-base/items/search`, {
            params: buildQueryParams({
                ...paging,
                search_term: searchTerm,
            }),
        })
        .then((response) => response.data)
}
