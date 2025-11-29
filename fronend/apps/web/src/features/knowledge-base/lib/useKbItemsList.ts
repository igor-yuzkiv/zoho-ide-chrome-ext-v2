import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { fetchKbItemsRequest, KnowledgeBaseQueryKeys } from '@zoho-ide/backend-api/knowledge-base'
import type { IKnowledgeBaseItem } from '@zoho-ide/shared/entities/knowledge-base'

export function useKbItemsList() {
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
