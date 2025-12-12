import { apiClient } from '@zoho-ide/shared'
import type {  PaginationParams, PagingResponse, SortParams } from '@zoho-ide/shared'
import type { IAttachment } from '../types'

export function fetchEntityAttachmentsRequest(
    entityType: string,
    entityId: string,
    paging: PaginationParams = { page: 1, perPage: 15 },
    sort?: SortParams
): Promise<PagingResponse<IAttachment[]>> {
    const params = {
        page: paging.page,
        per_page: paging.perPage,
    } as Record<string, string | number>

    if (sort) {
        params.sort_by = sort.sort_by
        params.sort_order = sort.sort_order
    }

    return apiClient
        .get<PagingResponse<IAttachment[]>>(`/attachments/${entityType}/${entityId}`, { params })
        .then((response) => response.data)
}
