import type { PaginationParams, PagingResponse, SortParams } from '../../contracts/common'
import type { IUser } from '../../contracts/user/user.types.ts'
import { apiClient } from '../core'

export async function fetchUsersRequest(
    paging: PaginationParams = { page: 1, per_page: 15 },
    sort?: SortParams
): Promise<PagingResponse<IUser[]>> {
    const params = {
        page: paging.page,
        per_page: paging.per_page,
    } as Record<string, string | number>

    if (sort) {
        params.sort_by = sort.sort_by
        params.sort_order = sort.sort_order
    }

    return apiClient.get<PagingResponse<IUser[]>>(`/users`, { params }).then((response) => response.data)
}
