import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { fetchUserByIdRequest, UserQueryKeys } from '@zoho-ide/backend-api/user'
import type { IUser } from '@zoho-ide/shared/entities/user'
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
