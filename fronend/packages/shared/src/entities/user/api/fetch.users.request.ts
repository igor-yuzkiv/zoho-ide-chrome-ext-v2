import { apiClient } from '../../../api'
import type { PaginationParams, PagingResponse, SortParams } from '../../../types'
import type { IUser } from '../types/user.types.ts'

export async function fetchUsersRequest(
    paging: PaginationParams = { page: 1, perPage: 15 },
    sort?: SortParams
): Promise<PagingResponse<IUser[]>> {
    const params = {
        page: paging.page,
        per_page: paging.perPage,
    } as Record<string, string | number>

    if (sort) {
        params.sort_by = sort.sort_by
        params.sort_order = sort.sort_order
    }

    return apiClient.get<PagingResponse<IUser[]>>(`/users`, { params }).then((response) => response.data)
}
