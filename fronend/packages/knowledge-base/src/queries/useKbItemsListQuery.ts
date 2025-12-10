import { fetchKbItemsRequest } from '../api'
import { KnowledgeBaseQueryKeys } from '../knowledge-base.constants.ts'
import type { IKnowledgeBaseItem } from '../types'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'

export function useKbItemsListQuery() {
    const { isPending, isFetching, data } = useQuery<IKnowledgeBaseItem[]>({
        queryKey: KnowledgeBaseQueryKeys.items(),
        placeholderData: keepPreviousData,
        queryFn: () => fetchKbItemsRequest().then((r) => r.data),
        initialData: [],
    })

    return {
        isPending,
        isFetching,
        data,
    }
}
