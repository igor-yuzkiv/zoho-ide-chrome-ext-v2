import { apiClient } from '@/lib/api.client.ts'
import type { PagingParams, PagingResponse } from '@/types/pagination.types.ts'
import type { SortParams } from '@/types/sort.types.ts'
import type { IUser } from '@/entities/user/user.types.ts'

export default function (
    paging: PagingParams = { page: 1, per_page: 15 },
    sort?: SortParams
): Promise<PagingResponse<IUser>> {
    const params = {
        page: paging.page,
        per_page: paging.per_page,
    } as Record<string, string | number>

    if (sort) {
        params.sort_by = sort.sort_by
        params.sort_order = sort.sort_order
    }

    return apiClient.get<PagingResponse<IUser>>(`/users`, { params }).then((response) => response.data)
}
