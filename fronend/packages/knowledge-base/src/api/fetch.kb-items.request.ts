import type { IKnowledgeBaseItem } from '../types'
import { apiClient } from '@zoho-ide/shared/api'
import type { PagingParams, PagingResponse, SortParams } from '@zoho-ide/shared/types'

export async function fetchKbItemsRequest(
    paging: PagingParams = { page: 1, per_page: 15 },
    sort?: SortParams
): Promise<PagingResponse<IKnowledgeBaseItem>> {
    const params = {
        page: paging.page,
        per_page: paging.per_page,
    } as Record<string, string | number>

    if (sort) {
        params.sort_by = sort.sort_by
        params.sort_order = sort.sort_order
    }

    return apiClient
        .get<PagingResponse<IKnowledgeBaseItem>>(`/knowledge-base/items`, { params })
        .then((response) => response.data)
}
