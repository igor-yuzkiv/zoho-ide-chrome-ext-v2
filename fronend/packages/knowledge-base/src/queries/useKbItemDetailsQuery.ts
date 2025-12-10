import { fetchKbItemByIdRequest } from '../api'
import { KnowledgeBaseQueryKeys } from '../knowledge-base.constants.ts'
import type { IKnowledgeBaseItemDetails } from '../types'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { type MaybeRefOrGetter, toValue } from 'vue'

export function useKbItemDetailsQuery(itemId: MaybeRefOrGetter<string>) {
    const { isPending, isFetching, data, isError } = useQuery<IKnowledgeBaseItemDetails>({
        queryKey: [...KnowledgeBaseQueryKeys.item(itemId)],
        placeholderData: keepPreviousData,
        queryFn: () => fetchKbItemByIdRequest(toValue(itemId)).then((res) => res.data),
    })

    return {
        isPending,
        isFetching,
        isError,
        data,
    }
}
