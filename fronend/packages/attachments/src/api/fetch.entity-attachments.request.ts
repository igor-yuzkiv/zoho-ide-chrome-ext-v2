import type { IAttachment } from '../types'
import { apiClient } from '@zoho-ide/shared'
import type { PaginationParams, PagingResponse, SortParams } from '@zoho-ide/shared'

export function fetchEntityAttachmentsRequest(
    entityType: string,
    entityId: string,
    paging: PaginationParams = { page: 1, per_page: 15 },
    sort?: SortParams
): Promise<PagingResponse<IAttachment[]>> {
    const params = {
        page: paging.page,
        per_page: paging.per_page,
    } as Record<string, string | number>

    if (sort) {
        params.sort_by = sort.sort_by
        params.sort_order = sort.sort_order
    }

    return apiClient
        .get<PagingResponse<IAttachment[]>>(`/attachments/${entityType}/${entityId}`, { params })
        .then((response) => response.data)
}
