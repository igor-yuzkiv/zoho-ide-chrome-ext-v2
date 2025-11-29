import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { type IUser, UserQueryKeys, fetchUsersRequest } from '@zoho-ide/shared'

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
