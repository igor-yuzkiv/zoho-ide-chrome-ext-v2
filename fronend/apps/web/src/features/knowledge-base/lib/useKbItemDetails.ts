import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { fetchKbItemByIdRequest, type IKnowledgeBaseItem, KnowledgeBaseQueryKeys } from '@zoho-ide/knowledge-base/index.ts'
import { type MaybeRefOrGetter, toValue } from 'vue'

export function useKbItemDetails(itemId: MaybeRefOrGetter<string>) {
    const { isPending, isFetching, data, isError } = useQuery<IKnowledgeBaseItem>({
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
