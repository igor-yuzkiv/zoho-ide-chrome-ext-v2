import { apiClient } from '../../api.client.ts'
import type { PagingParams, PagingResponse, SortParams } from '../../shared'
import type { IAttachment } from '@zoho-ide/shared/entities/attachment'

export function fetchEntityAttachmentsRequest(
    entityId: string,
    entityType: string,
    paging: PagingParams = { page: 1, per_page: 15 },
    sort?: SortParams
): Promise<PagingResponse<IAttachment>> {
    const params = {
        page: paging.page,
        per_page: paging.per_page,
    } as Record<string, string | number>

    if (sort) {
        params.sort_by = sort.sort_by
        params.sort_order = sort.sort_order
    }

    return apiClient
        .get<PagingResponse<IAttachment>>(`/attachments/${entityType}/${entityId}`, { params })
        .then((response) => response.data)
}
