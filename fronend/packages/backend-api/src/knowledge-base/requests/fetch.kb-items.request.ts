import { apiClient } from '../../api.client.ts'
import type { PagingParams, PagingResponse, SortParams } from '../../shared'
import type { IKnowledgeBaseItem } from '@zoho-ide/shared/entities/knowledge-base'

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
