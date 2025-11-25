import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import { fetchUsersRequest, UserQueryKeys } from '@zoho-ide/backend-api/user'
import type { IUser } from '@zoho-ide/shared/entities/user'

export function useUsersList() {
    const { isPending, isFetching, data } = useQuery<IUser[]>({
        queryKey: UserQueryKeys.lists(),
        placeholderData: keepPreviousData,
        queryFn: () => fetchUsersRequest().then((r) => r.data),
        initialData: [],
    })

    return {
        isPending,
        isFetching,
        data,
    }
}
