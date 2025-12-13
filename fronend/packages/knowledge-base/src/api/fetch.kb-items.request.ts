import type { IKnowledgeBaseItem } from '../types'
import { apiClient, buildQueryParams } from '@zoho-ide/shared'
import type { PaginationParams, PagingResponse, SortParams } from '@zoho-ide/shared'

export async function fetchKbItemsRequest(
    paging: PaginationParams = { page: 1, per_page: 15 },
    sort?: SortParams
): Promise<PagingResponse<IKnowledgeBaseItem[]>> {
    return apiClient
        .get<PagingResponse<IKnowledgeBaseItem[]>>(`/knowledge-base/items`, {
            params: buildQueryParams({ ...paging, ...(sort || {}) }),
        })
        .then((response) => response.data)
}
