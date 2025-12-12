import type { IKnowledgeBaseItem } from '../types'
import { apiClient } from '@zoho-ide/shared'
import type { PaginationParams, PagingResponse, SortParams } from '@zoho-ide/shared'

export async function fetchKbItemsRequest(
    paging: PaginationParams = { page: 1, perPage: 15 },
    sort?: SortParams
): Promise<PagingResponse<IKnowledgeBaseItem[]>> {
    const params = {
        page: paging.page,
        per_page: paging.perPage,
    } as Record<string, string | number>

    if (sort) {
        params.sort_by = sort.sort_by
        params.sort_order = sort.sort_order
    }

    return apiClient
        .get<PagingResponse<IKnowledgeBaseItem[]>>(`/knowledge-base/items`, { params })
        .then((response) => response.data)
}
