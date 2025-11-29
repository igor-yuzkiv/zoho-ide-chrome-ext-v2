import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { type IUser, UserQueryKeys,fetchUserByIdRequest } from '@zoho-ide/shared'
import { type MaybeRefOrGetter, toValue } from 'vue'

export function useUserDetails(userId: MaybeRefOrGetter<string>) {
    const { isPending, isFetching, data, isError } = useQuery<IUser>({
        queryKey: [...UserQueryKeys.details(userId)],
        placeholderData: keepPreviousData,
        queryFn: () => fetchUserByIdRequest(toValue(userId)).then((res) => res.data),
    })

    return {
        isPending,
        isFetching,
        isError,
        data,
    }
}
