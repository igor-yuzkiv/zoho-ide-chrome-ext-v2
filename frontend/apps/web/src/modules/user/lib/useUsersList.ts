import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { fetchUsersRequest, type IUser, UserQueryKeys } from '@zoho-ide/shared'

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
