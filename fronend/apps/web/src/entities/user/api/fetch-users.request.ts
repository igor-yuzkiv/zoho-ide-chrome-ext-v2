import { apiClient } from "@/shared/api/api.client.ts";
import type {
    PagingParams,
    PagingResponse,
} from "@/shared/types/pagination.types.ts";
import type { SortParams } from "@/shared/types/sort.types.ts";
import { DefaultPagingParams } from "@/shared/config/data.config.ts";
import type { IUser } from "@/entities/user/model/user.types.ts";

export default function (
    paging: PagingParams = DefaultPagingParams,
    sort?: SortParams,
): Promise<PagingResponse<IUser>> {
    const params = {
        page: paging.page,
        per_page: paging.per_page,
    } as Record<string, string | number>;

    if (sort) {
        params.sort_by = sort.sort_by;
        params.sort_order = sort.sort_order;
    }

    return apiClient
        .get<PagingResponse<IUser>>(`/users`, { params })
        .then((response) => response.data);
}
