import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { fetchKbItemsRequest, type IKnowledgeBaseItem, KnowledgeBaseQueryKeys } from '@zoho-ide/knowledge-base/index.ts'

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
